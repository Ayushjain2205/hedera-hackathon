"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // If query matches task ID pattern (TASK-XXX)
    if (/^TASK-\d{3}$/.test(query)) {
      router.push(`/task/${query}`);
    }
    // If query looks like an agent name
    else {
      router.push(`/agent/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
      <Input
        type="text"
        placeholder="Search by Agent Name or Task ID (e.g., TASK-001)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-14 pl-12 pr-4 text-lg rounded-lg border-2 border-gray-200 focus:border-blue-500"
      />
      <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
      <Button
        type="submit"
        className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700"
      >
        Search
      </Button>
    </form>
  );
}
