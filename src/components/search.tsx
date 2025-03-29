"use client";

import { Search } from "lucide-react";

export default function SearchForm() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ask stocks or anything"
            className="w-full bg-gray-800 text-gray-100 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
