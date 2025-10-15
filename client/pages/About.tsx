export default function About() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <section className="container py-14">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">About</h1>
        <p className="text-foreground/80 leading-relaxed max-w-3xl">
          We use a blend of recommendation techniques and natural language to help you
          discover products that feel right for you. Our system looks at patterns like
          recent views and purchases, then explains suggestions in simple, human terms—
          no jargon. The result is a warm, personal shopping experience.
        </p>
      </section>
    </main>
  );
}
