import { feature, product, featureItem, priceItem } from "atmn";

// Features
export const all_features = feature({
  id: "all_features",
  name: "All Features Included",
  type: "boolean",
});

export const unlimited_usage = feature({
  id: "unlimited_usage",
  name: "Unlimited Usage",
  type: "boolean",
});

// Single Plan - $100/month with everything
export const proPlan = product({
  id: "pro",
  name: "AI Lawyer Pro",
  is_default: false,
  items: [
    priceItem({
      price: 100,
      interval: "month",
    }),
    featureItem({
      feature_id: all_features.id,
    }),
    featureItem({
      feature_id: unlimited_usage.id,
    }),
  ],
});

export default {
  products: [proPlan],
  features: [all_features, unlimited_usage],
};

