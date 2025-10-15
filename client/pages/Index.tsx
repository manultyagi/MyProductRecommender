import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(1200px_600px_at_-10%_-20%,theme(colors.accent/50),transparent),radial-gradient(900px_500px_at_110%_10%,theme(colors.secondary/60),transparent)]">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

      <section className="container flex flex-col items-center justify-center gap-8 py-24 text-center md:py-28">
        <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-foreground/70 shadow-sm">
          E-commerce Product Recommender
        </span>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Discover products you’ll love — recommended just for you.
        </h1>
        <p className="max-w-2xl text-pretty text-foreground/70">
          Warm, friendly suggestions powered by AI with clear, human explanations.
        </p>
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="h-12 rounded-xl px-6 text-base bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md hover:shadow-lg hover:to-primary/70"
          >
            <Link to="/dashboard">Get My Recommendations</Link>
          </Button>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
          >
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}
