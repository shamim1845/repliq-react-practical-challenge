import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import * as z from "zod";
import AuthForm, { formSchema } from "./AuthForm";

const Login = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials carefully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <AuthForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Login;
