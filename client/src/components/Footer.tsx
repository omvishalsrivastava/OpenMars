import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 bg-muted/30">
      <div className="container flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <img src="/mars-ultra.png" alt="Mars" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight">OpenMars</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link href="/disclaimer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link>
          <a href="mailto:omvishalsrivastava@gmail.com" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="pt-8 border-t border-border/50 w-full">
          <p className="text-sm text-muted-foreground">
            © 2026 OpenMars Aerospace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
