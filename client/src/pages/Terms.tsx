import { Globe, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <img src="/mars-ultra.png" alt="Mars" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenMars</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/advanced" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Advanced</Link>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="container py-6 flex flex-col gap-4">
              <Link href="/about" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/advanced" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>Advanced</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="container py-16 max-w-3xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: June 14, 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Educational Purpose</h2>
            <p>
              OpenMars is provided strictly for educational and research purposes. The platform aims to 
              demonstrate aerospace engineering principles and propulsion analysis through simplified models.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Professional Advice</h2>
            <p>
              The content and calculations provided by OpenMars do not constitute professional aerospace 
              engineering advice. Users should not rely on this platform for real-world mission planning 
              or safety-critical applications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Warranty Disclaimer</h2>
            <p>
              OpenMars is provided "as is" without any warranty of any kind, express or implied. 
              We do not guarantee the accuracy, completeness, or reliability of the calculations 
              or data presented on the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
            <p>
              In no event shall OpenMars or its developers be liable for any damages arising out of 
              the use or inability to use the platform, even if notified of the possibility of such damages.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
