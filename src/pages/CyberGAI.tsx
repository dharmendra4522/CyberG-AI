import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // useState ko add karein
import { useNavigate } from "react-router-dom"; // Link ki jagah useNavigate use karenge
import { Button } from "@/components/ui/button"; // Button component ko import karein
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChartsShowcase from "@/components/ChartsShowcase";
import Analytics from "@/components/Analytics";
import HowItWorks from "@/components/HowItWorks";
import Integration from "@/components/Integration";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ChartGeneratorPage from "@/components/ChartGeneratorPage";

const CyberGAI = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Page load hone par check karo ki user ka data localStorage mein hai ya nahi
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Logout karne par localStorage saaf karo...
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // ...state ko reset karo...
    setUser(null);
    // ...aur user ko login page par bhej do.
    navigate("/");
  };

  useEffect(() => {
    // Add scroll-driven animation observers
    const elements = document.querySelectorAll(".fade-in-up, .scale-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Smooth scroll with parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax");

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || "0.5";
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">CyberG AI</div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#charts"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Charts
              </a>
              <a
                href="#analytics"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Analytics
              </a>
              <a
                href="#integrations"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Integrations
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                // Agar user logged in hai, to yeh dikhao
                <>
                  <span className="text-sm font-medium text-foreground">
                    Welcome, {user.name}
                  </span>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </>
              ) : (
                // Agar user logged in nahi hai, to yeh dikhao
                <>
                  <button
                    onClick={() => navigate("/auth")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/auth")}
                    className="bg-gradient-cyber text-white px-6 py-2 rounded-lg hover:shadow-neon transition-all duration-300"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* chartGenerator */}
      <ChartGeneratorPage />

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* Charts Showcase Section */}
      <div id="charts">
        <ChartsShowcase />
      </div>

      {/* Analytics Section */}
      <div id="analytics">
        <Analytics />
      </div>

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Integration Section */}
      <div id="integrations">
        <Integration />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Pricing Section */}
      <div id="pricing">
        <Pricing />
      </div>

      {/* Call to Action Section */}
      <CallToAction />

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default CyberGAI;
