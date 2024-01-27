"use client";

import React from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBox = ({ className }: { className?: string }) => {
  const handleAction = (formData: FormData) => {
    const searchTearm = formData.get("search");

    console.log(searchTearm);
  };

  return (
    <div className={cn("w-full bg-gray-200 rounded-md", className)}>
      <form action={handleAction} className="">
        <div className="flex items-center justify-between h-12">
          <input
            type="text"
            placeholder="Search for products..."
            name="search"
            className="w-full h-full rounded-l-md focus:border-none focus:outline-none pl-5 bg-gray-100"
          />
          <button className="group px-5 hover:bg-green-600 h-full transition-all  rounded-r-md">
            <SearchIcon
              className="text-green-600 group-hover:text-white "
              size={20}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
