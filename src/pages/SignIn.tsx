import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/calendar");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center flex-1 gradient-hero p-12">
        <Calendar className="h-12 w-12 text-primary-foreground mb-6" />
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">Tempo</h1>
        <p className="text-primary-foreground/80 max-w-sm">
          Your time, beautifully organized. Stay on top of every moment.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 bg-card">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Tempo</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
        <p className="text-muted-foreground mb-6">Sign in to access your calendar</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <Link to="/calendar" className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors">
          Continue without signing in →
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
