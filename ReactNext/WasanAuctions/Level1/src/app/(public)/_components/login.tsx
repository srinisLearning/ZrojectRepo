"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//import { loginUser } from "@/actions/users";
//import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  role: z.enum(["user", "admin"]).optional(),
});

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response: any = await loginUser(
        values.email,
        values.password,
        values.role!
      );
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Login successful");
      Cookies.set("token", response.data.token); // Store token in cookies
      Cookies.set("role", response.data.role); // Store role in cookies

      // Redirect based on role
      router.push(`/${response.data.role}/dashboard`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full px-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-primary font-bold! text-xl">
            Login to your account
          </h1>
          <hr className="border-gray-300" />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    {["user", "admin"].map((role) => (
                      <FormItem className="flex items-center gap-3" key={role}>
                        <FormControl>
                          <RadioGroupItem value={role} />
                        </FormControl>
                        <FormLabel className="uppercase">
                          {role.toUpperCase()}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <h1 className="text-sm text-gray-700 font-semibold flex gap-5">
              Don't have an account?{" "}
              <Link
                href="/?form=register"
                className="text-gray-700 underline px-5"
              >
                Register
              </Link>
            </h1>
            <Button type="submit" className="w-max" disabled={loading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;