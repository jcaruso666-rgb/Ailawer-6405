import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod/v4";
import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const onSubmitHandler = form.handleSubmit(async (data) => {
    try {
      setError(null);
      setIsLoading(true);
      setSuccess(false);
      
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      
      if (result.error) {
        setError(result.error.message || "Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }
      
      setSuccess(true);
      
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setError(err?.message || "An error occurred during sign in. Please try again.");
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
      >
        <span>←</span> Back to Home
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50/50 text-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Successfully signed in! Redirecting...
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        disabled={isLoading || success}
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isLoading || success}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || success}>
                {isLoading ? "Signing in..." : success ? "Success!" : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
