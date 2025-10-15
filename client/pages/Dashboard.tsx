import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category, GetRecommendationsResponse, Recommendation } from "@shared/api";

async function fetchRecommendations(category?: Category): Promise<GetRecommendationsResponse> {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`/api/recommendations${params}`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}

const CATEGORIES: Category[] = ["electronics", "fashion", "home", "beauty", "sports"];

export default function Dashboard() {
  const [category, setCategory] = useState<Category | undefined>();
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations", category ?? "all"],
    queryFn: () => fetchRecommendations(category),
  });

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const toggleWishlist = (id: string) =>
    setWishlist((w) => ({ ...w, [id]: !w[id] }));

  const recommendations = useMemo<Recommendation[]>(() => data?.recommendations ?? [], [data]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-accent/40 via-secondary/40 to-background pb-16 pt-8">
      <div className="container space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your Recommendations</h1>
            <p className="text-sm text-foreground/70">Curated picks with friendly AI explanations.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-foreground/70">Filter by category</label>
            <Select
              value={category ?? "all"}
              onValueChange={(v) => setCategory(v === "all" ? undefined : (v as Category))}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-9 w-40" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <ProductCard
                key={rec.product.id}
                rec={rec}
                onToggleWishlist={toggleWishlist}
                inWishlist={!!wishlist[rec.product.id]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
