import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Target, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-plantation.jpg";
const Hero = () => {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center parallax" style={{
      backgroundImage: `url(${heroImage})`
    }}>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-[48px] font-bold text-background leading-tight">
            Sistem Identifikasi Penyakit Tanaman Daun Teh
          </h1>
          
          <p className="text-2xl text-background/90 font-medium md:text-4xl">
            Convolutional Neural Network EfficientNet-B4
          </p>
          
          
          
          
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            
            
            
            
            
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-background/70" strokeWidth={2} />
      </div>
    </section>;
};
export default Hero;