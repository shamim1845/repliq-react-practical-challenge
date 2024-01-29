import React, { Suspense } from "react";
import AuthTabs from "./_components/AuthTabs";

const Auth = () => {
  return (
    <main>
      <div className="container">
        <Suspense>
          <AuthTabs />
        </Suspense>
      </div>
    </main>
  );
};

export default Auth;
