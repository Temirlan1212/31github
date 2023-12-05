"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserFormSchema, userFormSchema } from "@/validator-shema/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authentication } from "@/helpers/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function SignInForm() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<IUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { setError, reset } = form;

  async function onSubmit(data: IUserFormSchema) {
    setLoading(true);
    await authentication({
      credentials: { username: data.username, email: data?.email || "", password: data.password },
      options: { setError, reset, router },
    });
    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-[10px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{t("Main")}</CardTitle>
              <CardDescription>Enter your email below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <div className="grid grid-cols-2 gap-6">
                <Button variant="outline">
                  Github
                </Button>
                <Button variant="outline">
                  Google
                </Button>
              </div> */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div> */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" color="error" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" loading={loading}>
                sign in
              </Button>
            </CardFooter>

            <p className="px-8 text-center text-sm text-muted-foreground">
              If you dont have an account{" "}
              <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </Link>
            </p>
          </Card>
        </form>
      </Form>
    </>
  );
}
