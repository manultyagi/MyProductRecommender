import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Info } from "lucide-react";
import { useState } from "react";
import type { Recommendation } from "@shared/api";
import { formatINRFromUSD } from "@/lib/currency";

interface Props {
  rec: Recommendation;
  onToggleWishlist?: (id: string) => void;
  inWishlist?: boolean;
}

export default function ProductCard({ rec, onToggleWishlist, inWishlist }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="group overflow-hidden border-0 shadow-sm ring-1 ring-border/70 transition-all hover:shadow-md hover:-translate-y-0.5 bg-gradient-to-b from-card to-card/90">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={rec.product.imageUrl}
          alt={rec.product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-primary/90 text-primary-foreground shadow-sm">Recommended for you</Badge>
        </div>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">{rec.product.name}</CardTitle>
        <CardDescription className="text-sm text-foreground/70">
          {formatINRFromUSD(rec.product.price)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/80">
          {rec.explanation}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow hover:shadow-md hover:to-primary/70"
              size="sm"
            >
              <Info className="mr-1.5" /> View More
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{rec.product.name}</DialogTitle>
              <DialogDescription>
                Detailed view with friendly explanation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={rec.product.imageUrl}
                alt={rec.product.name}
                className="h-48 w-full rounded-md object-cover"
              />
              <p className="text-sm text-foreground/80">{rec.explanation}</p>
              <p className="font-medium">Price: {formatINRFromUSD(rec.product.price)}</p>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => onToggleWishlist?.(rec.product.id)}
          variant={inWishlist ? "secondary" : "default"}
          className={
            inWishlist
              ? "bg-secondary text-secondary-foreground"
              : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow hover:shadow-md hover:to-primary/70"
          }
          size="sm"
        >
          <Heart className={"mr-1.5" + (inWishlist ? " fill-current" : "")} />
          {inWishlist ? "Wishlisted" : "Add to Wishlist"}
        </Button>
      </CardFooter>
    </Card>
  );
}
