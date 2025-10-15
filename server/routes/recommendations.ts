import { RequestHandler } from "express";
import type { Category, GetRecommendationsResponse, Product, Recommendation } from "@shared/api";

const CATALOG: Product[] = [
  {
    id: "p-1001",
    name: "Aurora Wireless Headphones",
    price: 129.99,
    imageUrl: "https://images.pexels.com/photos/5099869/pexels-photo-5099869.jpeg",
    category: "electronics",
  },
  {
    id: "p-1002",
    name: "Velvet Knit Cardigan",
    price: 69.5,
    imageUrl: "https://images.pexels.com/photos/9603625/pexels-photo-9603625.jpeg",
    category: "fashion",
  },
  {
    id: "p-1003",
    name: "Terracotta Planter Set",
    price: 39.0,
    imageUrl: "https://images.pexels.com/photos/981615/pexels-photo-981615.jpeg",
    category: "home",
  },
  {
    id: "p-1004",
    name: "Glow Hydrating Serum",
    price: 42.0,
    imageUrl: "https://images.pexels.com/photos/4465828/pexels-photo-4465828.jpeg",
    category: "beauty",
  },
  {
    id: "p-1005",
    name: "Breeze Running Shoes",
    price: 89.99,
    imageUrl: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
    category: "sports",
  },
  {
    id: "p-1006",
    name: "Ceramic Dinnerware – 4pc",
    price: 59.99,
    imageUrl: "https://images.pexels.com/photos/8903301/pexels-photo-8903301.jpeg",
    category: "home",
  },
  {
    id: "p-1007",
    name: "Minimal Leather Wallet",
    price: 45.0,
    imageUrl: "https://images.pexels.com/photos/9243179/pexels-photo-9243179.jpeg",
    category: "fashion",
  },
  {
    id: "p-1008",
    name: "Noiseless Mechanical Keyboard",
    price: 139.0,
    imageUrl: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg",
    category: "electronics",
  },
];

const EXPLANATIONS: Record<Category, string[]> = {
  electronics: [
    "You recently explored similar gadgets, so we picked this to match your tech taste.",
    "Based on your interest in audio gear and keyboards, this could be a great fit.",
  ],
  fashion: [
    "Your style leans toward cozy, minimal pieces—this complements your picks.",
    "We noticed you liked warm textures and neutrals, so this is right up your alley.",
  ],
  home: [
    "You’ve been browsing home essentials with natural finishes—this set pairs nicely.",
    "Your recent interest in decor suggests you’ll love this timeless piece.",
  ],
  beauty: [
    "You checked out skincare routines—this serum adds a gentle, hydrating boost.",
    "Because you prefer clean, subtle beauty, this fits your routine well.",
  ],
  sports: [
    "You looked at training gear—these shoes keep things light and supportive.",
    "For your active days, this pick balances comfort and performance.",
  ],
};

export const handleRecommendations: RequestHandler = (req, res) => {
  const category = (req.query.category as Category | undefined) || undefined;

  const products = category
    ? CATALOG.filter((p) => p.category === category)
    : CATALOG;

  const recommendations: Recommendation[] = products.map((p) => {
    const pool = EXPLANATIONS[p.category];
    const explanation = pool[Math.floor(Math.random() * pool.length)];
    return { product: p, explanation };
  });

  const response: GetRecommendationsResponse = { recommendations };
  res.json(response);
};
