import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCustomer, usePricingTable } from "autumn-js/react";
import { useState } from "react";

interface AvailablePlansProps {
  userId: string;
}

export function AvailablePlans({ userId }: AvailablePlansProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { customer, attach } = useCustomer();

  // Load products from Autumn's pricing table
  const { products } = usePricingTable();

  const handleSubscribe = async (productId: string) => {
    try {
      setLoadingPlan(productId);
      // Let Autumn handle the dialog and payment flow
      await attach({ productId, successUrl: window.location.href });
    } catch (error) {
      console.error("Failed to attach product:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!products?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Loading subscription options...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const product = products?.[0];
  
  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Loading subscription information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCurrentPlan =
    customer?.products?.some((p: any) => 
      p.id === product.id && p.status === 'active'
    ) || false;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Simple Pricing</CardTitle>
        <CardDescription>
          One plan, all features, no BS
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-md mx-auto">
        <Card className={`transition-all duration-200 ${
          isCurrentPlan ? "border-2 border-primary bg-primary/5 shadow-md" : "border-2 border-primary"
        }`}>
          {isCurrentPlan && (
            <div className="flex justify-center pt-4">
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Active Subscription
              </Badge>
            </div>
          )}
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <div className="mt-4">
              <div className="text-5xl font-bold">$100</div>
              <div className="text-lg text-muted-foreground mt-1">per month</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Full access to AI Legal Advisor</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Unlimited legal research</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Document drafting & templates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Case management system</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">OSINT & background checks</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Legal knowledge base</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Self-representation guides</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="font-medium">Court procedures & resources</span>
              </div>
            </div>

            <Button
              className="w-full text-base py-6"
              size="lg"
              onClick={() => handleSubscribe(product.id)}
              disabled={!userId || loadingPlan === product.id || isCurrentPlan}
              variant={isCurrentPlan ? "outline" : "default"}
            >
              {isCurrentPlan ?
                "Active Subscription"
              : loadingPlan === product.id ?
                "Processing…"
              : "Get Started Now"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Cancel anytime. No contracts, no hidden fees.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
