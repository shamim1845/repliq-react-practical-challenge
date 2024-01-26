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

const Register = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>Register as a new user</CardTitle>
          <CardDescription>
            Please remember your credentials to log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <AuthForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Register;
