"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./_components/Login";
import Register from "./_components/Register";

export default function Auth() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <Tabs defaultValue="login" className="w-full max-w-[600px] m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <Login />
        <Register />
      </Tabs>
    </div>
  );
}
