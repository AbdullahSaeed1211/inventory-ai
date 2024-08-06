// app/page.tsx

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">
        Welcome to Pantry Tracker
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Keep track of your pantry items easily and efficiently.
      </p>
      <Link href="/pantry">
        <p className="px-6 py-3 bg-blue-600 text-white text-xl rounded-md hover:bg-blue-700">
          Get Started
        </p>
      </Link>
    </div>
  );
}
