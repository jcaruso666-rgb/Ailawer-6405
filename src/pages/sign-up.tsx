import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth";
import { z } from "zod/v4";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>();
  
  const onSubmitHandler = form.handleSubmit(async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log('[SIGN UP] Attempting sign up for:', data.email);
      console.log('[SIGN UP] Auth client baseURL:', (authClient as any)._baseURL || 'unknown');
      
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      console.log('[SIGN UP] Result:', result);
      
      if (result.error) {
        console.error('[SIGN UP] Error from auth:', result.error);
        setError(result.error.message || "Sign up failed. Please try again.");
        setIsLoading(false);
        return;
      }
      
      console.log('[SIGN UP] Success! User:', result.data);
      setSuccess(true);
      
      setTimeout(() => {
        console.log('[SIGN UP] Redirecting to dashboard');
        navigate("/dashboard", { replace: true });
      }, 1000);
      
    } catch (e: any) {
      console.error('[SIGN UP] Exception:', e);
      console.error('[SIGN UP] Error stack:', e?.stack);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (e?.message?.includes("fetch") || e?.message?.includes("Network")) {
        errorMessage = "Network error: Unable to connect to the server. Please check your connection and try again.";
      } else if (e?.message?.includes("CORS")) {
        errorMessage = "Connection error: Cross-origin request blocked. Please contact support.";
      } else if (e?.code && e?.message) {
        errorMessage = `${e.code}: ${e.message}`;
      } else if (e?.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Link to="/" className="absolute top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
        <span>←</span> Back to Home
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 border-red-200 bg-red-50/50 text-red-800 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50/50 text-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 font-medium">
                Account created successfully! Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
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
                {isLoading ? "Creating Account..." : success ? "Success!" : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
