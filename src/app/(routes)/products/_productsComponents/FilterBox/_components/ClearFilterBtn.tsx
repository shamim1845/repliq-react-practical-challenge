"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ClearFilterBtn = () => {
  const router = useRouter();
  const handleclear = () => {
    router.replace("/products");
  };
  return (
    <div>
      <Button onClick={handleclear}>Clear Filter</Button>
    </div>
  );
};

export default ClearFilterBtn;
