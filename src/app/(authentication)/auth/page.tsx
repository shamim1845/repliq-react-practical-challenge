import React, { Suspense } from "react";
import AuthTabs from "./_components/AuthTabs";

const Auth = () => {
  return (
    <main>
      <Suspense>
        <AuthTabs />
      </Suspense>
    </main>
  );
};

export default Auth;
