import { Leaf } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">Tea-Leaves</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Sistem identifikasi penyakit tanaman daun teh berbasis kecerdasan buatan 
              untuk pertanian modern yang lebih produktif dan berkelanjutan.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#diseases" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Penyakit
                </a>
              </li>
              <li>
                <a href="#detection" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Deteksi
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60">Copyright © 2025 Tea-Leaves. Sistem Identifikasi Penyakit Tanaman Daun Teh. Powered by EfficientNet-B4.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;