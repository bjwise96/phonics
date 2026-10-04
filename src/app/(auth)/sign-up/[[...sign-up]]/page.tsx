import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md mx-auto mb-3">
          P
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Inkwell Phonics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Create Teacher Account
        </p>
      </div>
      <SignUp />
    </div>
  );
}
