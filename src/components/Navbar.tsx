import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-accent transition-colors">
            <Leaf className="w-8 h-8 text-accent" />
            <span>Tea-Leaves</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground hover:text-accent transition-colors font-medium">Tentang</a>
            <a href="#diseases" className="text-foreground hover:text-accent transition-colors font-medium">Penyakit</a>
            <a href="#detection" className="text-foreground hover:text-accent transition-colors font-medium">Identifikasi</a>
            <a href="#contact" className="text-foreground hover:text-accent transition-colors font-medium">Kontak</a>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="secondary" size="sm" className="hidden md:inline-flex" asChild>
              <a href="#detection">Coba Sekarang</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
