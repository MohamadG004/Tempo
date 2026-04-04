import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Repeat, LayoutGrid, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Tempo</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/signin">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-primary text-primary-foreground">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-20 pb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Smart calendar for modern life
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-3xl">
          Your time,{" "}
          <span className="gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text]">beautifully</span>{" "}
          organized
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl text-lg">
          Plan your days with multiple views, recurring events, and a clean interface designed to keep you focused.
        </p>
        <Link to="/calendar" className="mt-8">
          <Button size="lg" className="gradient-primary text-primary-foreground gap-2">
            Open Calendar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: LayoutGrid, title: "Multiple Views", desc: "Switch between month, week, and day views seamlessly" },
          { icon: Repeat, title: "Recurring Events", desc: "Daily, weekly, monthly, or yearly, set it and forget it" },
          { icon: Sparkles, title: "Beautiful Design", desc: "Clean, modern interface with color-coded events" },
        ].map((f) => (
          <div key={f.title} className="bg-card rounded-xl p-6 border border-border shadow-sm animate-fade-in">
            <f.icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Mohamad Ghattas.
      </footer>
    </div>
  );
};

export default Index;