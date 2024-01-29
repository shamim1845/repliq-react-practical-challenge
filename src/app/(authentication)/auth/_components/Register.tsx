import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import * as z from "zod";
import RegisterForm, { formSchema } from "./RegisterForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(`/api/auth/register`, values);

      if (res.status === 201 && res.data.user) {
        router.replace("/auth?tab=login");
      }

      toast(res.data.message);
    } catch (error: any) {
      console.log(error);
      if (error) toast(error?.response?.data?.message);
    }
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
          <RegisterForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Register;
