import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Repeat, LayoutGrid, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
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
            <Button size="sm" className="gradient-primary text-primary-foreground">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        className="flex flex-col items-center text-center px-4 pt-20 pb-16"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Smart calendar for modern life
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-3xl"
        >
          Your time,{" "}
          <span className="gradient-primary bg-clip-text text-transparent [-webkit-background-clip:text]">
            beautifully
          </span>{" "}
          organized
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-muted-foreground max-w-xl text-lg"
        >
          Plan your days with multiple views, recurring events, and a clean interface designed to keep you focused.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8">
          <Link to="/calendar">
            <Button size="lg" className="gradient-primary text-primary-foreground gap-2">
              Open Calendar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Feature cards */}
      <motion.section
        className="max-w-4xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[
          { icon: LayoutGrid, title: "Multiple Views", desc: "Switch between month, week, and day views seamlessly" },
          { icon: Repeat, title: "Recurring Events", desc: "Daily, weekly, monthly, or yearly, set it and forget it" },
          { icon: Sparkles, title: "Beautiful Design", desc: "Clean, modern interface with color-coded events" },
        ].map((f) => (
          <motion.div
            key={f.title}
            variants={itemVariants}
            className="bg-card rounded-xl p-6 border border-border shadow-sm"
          >
            <f.icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Tempo
      </footer>
    </motion.div>
  );
};

export default Index;