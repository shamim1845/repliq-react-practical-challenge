import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import * as z from "zod";
import LoginForm, { formSchema } from "./LoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(`/api/auth/login`, values);

    if (res.status === 200 && res.data.user) {
      router.replace("/products");
    }

    toast(res.data.message);
  }

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials carefully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Login;
