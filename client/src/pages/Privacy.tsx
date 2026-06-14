import { Globe, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: June 14, 2026</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">User Accounts</h2>
            <p>
              OpenMars is designed to be a transparent and accessible platform. We do not require user accounts, 
              registration, or any form of personal identification to use our mission planning tools.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Data Usage</h2>
            <p>
              Any mission parameters or inputs you provide are used solely for the purpose of performing 
              aerospace calculations in real-time. This data is processed locally or on our secure servers 
              to generate your mission analysis and is not stored permanently.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your information to outside parties. 
              OpenMars does not collect personal data for marketing or tracking purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p>
              If you have any questions regarding this privacy policy, you may contact us at: 
              <span className="text-primary font-medium"> omvishalsrivastava@gmail.com</span>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
