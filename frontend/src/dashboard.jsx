import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This is your personal dashboard. Here you will be able to track your progress, view bookmarks, and manage your account.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          (Dashboard functionality coming soon...)
        </p>
      </div>
    </div>
  );
}
