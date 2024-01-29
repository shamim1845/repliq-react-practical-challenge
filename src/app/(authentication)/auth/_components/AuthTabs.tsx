"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import Login from "./Login";
import Register from "./Register";

export default function AuthTabs() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "login";

  const router = useRouter();

  return (
    <div className="mt-10 flex items-center justify-center">
      <Tabs value={tab} className="w-full max-w-[600px] m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            onClick={() => router.push("/auth?tab=login")}
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            onClick={() => router.push("/auth?tab=register")}
          >
            Register
          </TabsTrigger>
        </TabsList>
        <Login />
        <Register />
      </Tabs>
    </div>
  );
}
