import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Redirect ke liye
import toast from "react-hot-toast"; // Professional messages ke liye
// import axios from "axios"; // Real API ke liye
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Loader, // Loading ke liye
  ArrowRight,
} from "lucide-react";

const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Naya: Loading state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const navigate = useNavigate(); // Naya: Redirect ke liye

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- NAYA, UPDATED SUBMIT FUNCTION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // --- LOGIN LOGIC ---
      console.log("Dummy Login Call with:", {
        email: formData.email,
        password: formData.password,
      });
      await new Promise((res) => setTimeout(res, 1500)); // Nakli network delay

      if (
        formData.email === "test@test.com" &&
        formData.password === "password123"
      ) {
        toast.success("Login Successful! Redirecting...");

        // **localStorage mein data save karein**
        localStorage.setItem("accessToken", "DUMMY_REAL_TOKEN_FROM_API");
        localStorage.setItem(
          "user",
          JSON.stringify({ name: "Test User", email: "test@test.com" })
        );

        setTimeout(() => navigate("/"), 2000); // Homepage par bhejein
      } else {
        toast.error("Invalid email or password.");
      }

      /* // --- REAL API CALL (LOGIN) ---
        try {
            const response = await axios.post('/auth/login', { email: formData.email, password: formData.password });
            toast.success('Login Successful! Redirecting...');
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            setTimeout(() => navigate('/'), 2000);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed.');
        }
        */
    } else {
      // --- REGISTER LOGIC ---
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      console.log("Dummy Register Call with:", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      await new Promise((res) => setTimeout(res, 1500)); // Nakli network delay

      if (formData.email === "test@test.com") {
        toast.error("This email is already registered.");
      } else {
        toast.success("Registration successful! Please sign in.");
        setIsLogin(true); // User ko login view par bhej do
      }

      /* // --- REAL API CALL (REGISTER) ---
        try {
            const response = await axios.post('/auth/register', { name: formData.name, email: formData.email, password: formData.password });
            toast.success('Registration successful! Please sign in.');
            setIsLogin(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed.');
        }
        */
    }
    setLoading(false);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // --- AAPKA JSX BILKUL WAISA HI HAI, BAS BUTTON MEIN LOADING STATE ADD KI HAI ---
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* ... (Aapka poora animated background code yahan waisa hi rahega) ... */}
      <div className="absolute inset-0 overflow-hidden">
         {/* Animated Mesh Gradient Base */}{" "}
        <div className="absolute inset-0 animate-mesh-gradient opacity-60" />   
         {/* Interactive Wave Patterns */}{" "}
        <div className="absolute inset-0">
          {" "}
          <div className="absolute inset-0 bg-wave-pattern animate-wave opacity-30" />
          {" "}
          <div
            className="absolute inset-0 bg-wave-pattern animate-wave-reverse opacity-20"
            style={{ animationDelay: "2s" }}
          />
          {" "}
        </div>
         {/* Complex Grid System */}  {" "}
        <div
          className="absolute inset-0 opacity-25 cyber-grid-advanced parallax"
          data-speed="0.3"
        />
        {/* Dynamic Particle System */}    {" "}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`auth-particle-${i}`}
            className={`absolute bg-primary/70 rounded-full animate-particle-advanced-${
              i % 4
            }`}
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          />
        ))}
        {/* Floating Geometric Elements */}   {" "}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`auth-geometry-${i}`}
            className={`absolute border border-primary/40 animate-geometry-float-${
              i % 4
            }`}
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
         {/* Dynamic Gradient Orbs */} {" "}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-full blur-2xl animate-orb-complex" />
        {" "}
        <div className="absolute top-20 right-20 w-28 h-28 bg-gradient-radial from-accent/50 via-accent/25 to-transparent rounded-full blur-xl animate-orb-complex-reverse" />
        {" "}
        <div
          className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-radial from-secondary/30 via-secondary/15 to-transparent rounded-full blur-3xl animate-orb-complex"
          style={{ animationDelay: "4s" }}
        />
        {" "}
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-radial from-primary/35 via-primary/20 to-transparent rounded-full blur-2xl animate-orb-complex-reverse"
          style={{ animationDelay: "2s" }}
        />
         {/* Energy Networks */}{" "}
        <div className="absolute inset-0 opacity-25">
          {" "}
          <svg className="w-full h-full" viewBox="0 0 1200 800">
           {" "}
            <defs>
              {" "}
              <linearGradient
                id="auth-energy-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {" "}
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0"
                />
                {" "}
                <stop
                  offset="30%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.9"
                />
                {" "}
                <stop
                  offset="70%"
                  stopColor="hsl(var(--accent))"
                  stopOpacity="0.7"
                />
               {" "}
                <stop
                  offset="100%"
                  stopColor="hsl(var(--accent))"
                  stopOpacity="0"
                />
                {" "}
              </linearGradient>
             {" "}
            </defs>
           {" "}
            <path
              d="M0,400 Q300,200 600,400 Q900,600 1200,400"
              stroke="url(#auth-energy-gradient-1)"
              strokeWidth="2"
              fill="none"
              className="animate-energy-flow"
            />
            {" "}
            <path
              d="M0,200 Q400,500 800,200 Q1000,100 1200,300"
              stroke="url(#auth-energy-gradient-1)"
              strokeWidth="1.5"
              fill="none"
              className="animate-energy-flow"
              style={{ animationDelay: "3s" }}
            />
           {" "}
          </svg>
           {" "}
        </div>
         {/* Multi-layer Glow System */}{" "}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent animate-glow-wave" />
        {" "}
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-accent/20 via-accent/10 to-transparent animate-glow-wave-reverse" />
         {/* Dynamic Background Shifts */}{" "}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-background-shift opacity-80" />
          {" "}
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "fade-in-up animate" : "fade-in-up"
          }`}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium mb-6 animate-slide-in">
              <Shield className="w-4 h-4" />
              <span className="font-cyber">Secure Authentication</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-gradient">
                {isLogin ? "Welcome Back" : "Join CyberG AI"}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your AI-powered dashboard"
                : "Create your account and unlock intelligent insights"}
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 rounded-2xl border border-border/50 backdrop-blur-xl shadow-cyber">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl opacity-60" />
              <div className="absolute inset-0 cyber-dots opacity-20 rounded-2xl" />
            </div>
            <div className="relative p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isLogin ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
                  }`}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/60 rounded-xl backdrop-blur-sm focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all duration-300 placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/60 rounded-xl backdrop-blur-sm focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all duration-300 placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border/60 rounded-xl backdrop-blur-sm focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all duration-300 placeholder:text-muted-foreground"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isLogin ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
                  }`}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm your password"
                        className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border/60 rounded-xl backdrop-blur-sm focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all duration-300 placeholder:text-muted-foreground"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-4 text-muted-foreground">
                      or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="glow" className="w-full">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="glow" className="w-full">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"
                      />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 via-primary/2 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-l from-accent/5 via-accent/2 to-transparent" />
    </section>
  );
};

export default AuthSystem;
