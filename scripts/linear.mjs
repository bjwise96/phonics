#!/usr/bin/env node

/**
 * Lightweight Linear CLI tool for Project Inkwell Fleet
 * Uses Linear GraphQL API with zero external dependencies.
 *
 * Implements idiomatic Linear workflow:
 * - App domains are tracked via labels (app:forge, app:admin, app:landing, app:swgoh, app:core)
 * - Projects are time-bound milestones, not perpetual repo containers
 * - Completed issues are unlinked from long-running projects to allow auto-archiving (Free Tier 250 limit)
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load LINEAR_API_KEY from env, local .env.local, or admin .env.local
let apiKey = process.env.LINEAR_API_KEY;
if (!apiKey) {
  const candidatePaths = [
    resolve(__dirname, '../.env.local'),
    resolve(__dirname, '../../admin/.env.local')
  ];
  for (const envPath of candidatePaths) {
    if (existsSync(envPath)) {
      const content = readFileSync(envPath, 'utf-8');
      const match = content.match(/LINEAR_API_KEY=["']?([^"'\n]+)["']?/);
      if (match) {
        apiKey = match[1].trim();
        break;
      }
    }
  }
}

if (!apiKey) {
  console.error('Error: LINEAR_API_KEY not found in environment or .env.local');
  process.exit(1);
}

async function queryLinear(query, variables = {}) {
  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

const command = process.argv[2] || 'list';

async function main() {
  if (command === 'projects') {
    const data = await queryLinear(`
      query {
        projects {
          nodes {
            id
            name
            state
            progress
          }
        }
      }
    `);
    console.table(data.projects.nodes);
    return;
  }

  if (command === 'teams') {
    const data = await queryLinear(`
      query {
        teams {
          nodes {
            id
            name
            key
            states {
              nodes {
                id
                name
                type
              }
            }
          }
        }
      }
    `);
    console.log(JSON.stringify(data.teams.nodes, null, 2));
    return;
  }

  if (command === 'labels') {
    const data = await queryLinear(`
      query {
        issueLabels {
          nodes {
            id
            name
            color
          }
        }
      }
    `);
    console.table(data.issueLabels.nodes);
    return;
  }

  if (command === 'quota' || command === 'stats') {
    const data = await queryLinear(`
      query {
        issues(first: 250) {
          nodes {
            id
            state { name type }
            project { name }
            labels { nodes { name } }
          }
        }
      }
    `);
    const issues = data.issues.nodes;
    const total = issues.length;
    const done = issues.filter(i => i.state.type === 'completed' || i.state.name === 'Done').length;
    const canceled = issues.filter(i => i.state.type === 'canceled').length;
    const active = total - done - canceled;

    console.log('\n========================================');
    console.log('📊 Linear Workspace Quota & Status');
    console.log('========================================');
    console.log(`Non-Archived Issues: ${total} / 250 free limit (${Math.round((total / 250) * 100)}%)`);
    console.log(`  Active (Todo/In Progress/Backlog): ${active}`);
    console.log(`  Done:                             ${done}`);
    console.log(`  Canceled/Duplicate:               ${canceled}`);
    console.log('========================================\n');
    return;
  }

  if (command === 'list') {
    const args = process.argv.slice(3);
    const getArg = (name) => {
      const idx = args.indexOf(`--${name}`);
      return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
    };
    const appFilter = getArg('app');

    const data = await queryLinear(`
      query {
        issues(first: 100, filter: { state: { type: { nin: ["completed", "canceled"] } } }) {
          nodes {
            identifier
            title
            priority
            state {
              name
              type
            }
            project {
              name
            }
            labels {
              nodes {
                id
                name
              }
            }
            createdAt
          }
        }
      }
    `);

    let nodes = data.issues.nodes;
    if (appFilter) {
      const targetLabel = appFilter.startsWith('app:') ? appFilter : `app:${appFilter}`;
      nodes = nodes.filter(i => i.labels.nodes.some(l => l.name.toLowerCase() === targetLabel.toLowerCase()));
    }

    const formatted = nodes.map(i => {
      const appLabel = i.labels.nodes.find(l => l.name.startsWith('app:'))?.name.replace('app:', '') || '-';
      return {
        ID: i.identifier,
        Title: i.title.length > 40 ? i.title.slice(0, 37) + '...' : i.title,
        App: appLabel,
        Project: i.project?.name || 'None',
        State: i.state?.name || 'Unknown',
        Priority: i.priority,
      };
    });

    if (formatted.length === 0) {
      console.log(appFilter ? `No active issues found for app: ${appFilter}.` : 'No active issues found.');
    } else {
      console.table(formatted);
    }
    return;
  }

  if (command === 'create') {
    // Parse arguments: --title, --app, --project, --description, --priority (0=None, 1=Urgent, 2=High, 3=Normal, 4=Low)
    const args = process.argv.slice(3);
    const getArg = (name) => {
      const idx = args.indexOf(`--${name}`);
      return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
    };

    const title = getArg('title');
    const appName = getArg('app');
    const projectName = getArg('project');
    const description = getArg('description') || '';
    const priority = parseInt(getArg('priority') || '0', 10);

    if (!title) {
      console.error('Usage: node scripts/linear.mjs create --title "..." [--app admin|forge|swgoh|landing|core] [--project "..."] [--description "..."] [--priority 1-4]');
      process.exit(1);
    }

    // Get default team
    const teamData = await queryLinear(`query { teams(first: 1) { nodes { id } } }`);
    const teamId = teamData.teams.nodes[0]?.id;
    if (!teamId) throw new Error('No team found in Linear workspace');

    // Resolve labels
    const labelIds = [];
    if (appName) {
      const targetLabelName = appName.startsWith('app:') ? appName : `app:${appName}`;
      const labelData = await queryLinear(`query { issueLabels { nodes { id name } } }`);
      const foundLabel = labelData.issueLabels.nodes.find(l => l.name.toLowerCase() === targetLabelName.toLowerCase());
      if (foundLabel) {
        labelIds.push(foundLabel.id);
      } else {
        console.warn(`Warning: Label "${targetLabelName}" not found.`);
      }
    }

    let projectId = null;
    if (projectName) {
      const projData = await queryLinear(`query { projects { nodes { id name } } }`);
      const found = projData.projects.nodes.find(p => p.name.toLowerCase() === projectName.toLowerCase());
      if (found) projectId = found.id;
      else console.warn(`Warning: Project "${projectName}" not found. Creating issue without project.`);
    }

    const mutation = `
      mutation CreateIssue($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          success
          issue {
            id
            identifier
            title
            url
            labels { nodes { name } }
          }
        }
      }
    `;

    const res = await queryLinear(mutation, {
      input: {
        teamId,
        title,
        description,
        priority,
        ...(labelIds.length > 0 ? { labelIds } : {}),
        ...(projectId ? { projectId } : {}),
      },
    });

    if (res.issueCreate?.success) {
      const issue = res.issueCreate.issue;
      const labels = issue.labels?.nodes.map(l => l.name).join(', ') || 'none';
      console.log(`✅ Issue created: ${issue.identifier} - ${issue.title}`);
      console.log(`Labels: ${labels}`);
      console.log(`URL: ${issue.url}`);
    } else {
      console.error('Failed to create issue');
    }
    return;
  }

  if (command === 'update') {
    // Usage: update PRO-12 --state "In Progress"
    const identifier = process.argv[3];
    const args = process.argv.slice(4);
    const stateName = args[args.indexOf('--state') + 1];

    if (!identifier || !stateName) {
      console.error('Usage: node scripts/linear.mjs update <IDENTIFIER> --state <StateName>');
      process.exit(1);
    }

    // Look up issue and state
    const issueData = await queryLinear(`
      query GetIssue($id: String!) {
        issue(id: $id) {
          id
          project { id name }
          team {
            states {
              nodes {
                id
                name
                type
              }
            }
          }
        }
      }
    `, { id: identifier });

    const issue = issueData.issue;
    if (!issue) throw new Error(`Issue ${identifier} not found`);

    const state = issue.team.states.nodes.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (!state) {
      const available = issue.team.states.nodes.map(s => s.name).join(', ');
      throw new Error(`State "${stateName}" not found. Available states: ${available}`);
    }

    const isClosing = state.type === 'completed' || state.type === 'canceled' || state.name.toLowerCase() === 'done';

    // If closing, unlink project so the issue can auto-archive on schedule (Linear Free tier rule)
    const updateInput = { stateId: state.id };
    if (isClosing && issue.project) {
      updateInput.projectId = null;
    }

    const res = await queryLinear(`
      mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
        issueUpdate(id: $id, input: $input) {
          success
          issue {
            identifier
            title
            state {
              name
            }
            project {
              name
            }
          }
        }
      }
    `, {
      id: issue.id,
      input: updateInput,
    });

    if (res.issueUpdate?.success) {
      const unlinkedNote = (isClosing && issue.project) ? ` (unlinked from "${issue.project.name}" to allow auto-archiving)` : '';
      console.log(`✅ Updated ${identifier} to state: ${res.issueUpdate.issue.state.name}${unlinkedNote}`);
    }
    return;
  }

  if (command === 'archive') {
    const identifier = process.argv[3];
    if (!identifier) {
      console.error('Usage: node scripts/linear.mjs archive <IDENTIFIER>');
      process.exit(1);
    }

    const issueData = await queryLinear(`
      query GetIssue($id: String!) {
        issue(id: $id) { id identifier title }
      }
    `, { id: identifier });

    if (!issueData.issue) throw new Error(`Issue ${identifier} not found`);

    const res = await queryLinear(`
      mutation ArchiveIssue($id: String!) {
        issueArchive(id: $id) {
          success
        }
      }
    `, { id: issueData.issue.id });

    if (res.issueArchive?.success) {
      console.log(`📦 Archived issue ${identifier}: ${issueData.issue.title}`);
    }
    return;
  }

  if (command === 'archive-completed') {
    console.log('🔄 Finding all completed/canceled issues to archive...');
    const data = await queryLinear(`
      query {
        issues(first: 250, filter: { state: { type: { in: ["completed", "canceled"] } } }) {
          nodes {
            id
            identifier
            title
            state { name }
          }
        }
      }
    `);

    const completed = data.issues.nodes;
    console.log(`Found ${completed.length} completed/canceled issues.`);

    let archived = 0;
    for (const issue of completed) {
      const res = await queryLinear(`
        mutation ArchiveIssue($id: String!) {
          issueArchive(id: $id) {
            success
          }
        }
      `, { id: issue.id });

      if (res.issueArchive?.success) {
        archived++;
        console.log(`📦 Archived ${issue.identifier} (${issue.title.slice(0, 40)}...)`);
      }
    }

    console.log(`\n✅ Finished! Successfully archived ${archived} issues.`);
    console.log('These issues are preserved in Linear search/history but no longer count against your 250-issue limit.');
    return;
  }

  if (command === 'view' || command === 'show') {
    const identifier = process.argv[3];
    if (!identifier) {
      console.error('Usage: node scripts/linear.mjs view <IDENTIFIER>');
      process.exit(1);
    }

    const issueData = await queryLinear(`
      query GetIssue($id: String!) {
        issue(id: $id) {
          identifier
          title
          description
          priority
          url
          state {
            name
          }
          project {
            name
          }
          labels {
            nodes {
              name
            }
          }
          assignee {
            name
          }
        }
      }
    `, { id: identifier });

    const issue = issueData.issue;
    if (!issue) throw new Error(`Issue ${identifier} not found`);

    const labels = issue.labels?.nodes.map(l => l.name).join(', ') || 'None';

    console.log(`\n========================================`);
    console.log(`[${issue.identifier}] ${issue.title}`);
    console.log(`========================================`);
    console.log(`Labels:   ${labels}`);
    console.log(`Project:  ${issue.project?.name || 'None'}`);
    console.log(`State:    ${issue.state?.name || 'Unknown'}`);
    console.log(`Priority: ${issue.priority}`);
    console.log(`Assignee: ${issue.assignee?.name || 'Unassigned'}`);
    console.log(`URL:      ${issue.url}\n`);
    console.log(`Description:\n----------------------------------------`);
    console.log(issue.description || '(No description provided)');
    console.log(`----------------------------------------\n`);
    return;
  }

  console.log(`Unknown command: ${command}`);
  console.log('Available commands: list [--app <name>], quota, create, update, archive, archive-completed, projects, teams, labels, view');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
