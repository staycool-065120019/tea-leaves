import { Brain, Cpu, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const features = [{
  icon: Brain,
  title: "Analisis AI Otomatis",
  description: "Menggunakan deep learning EfficientNet-B4 untuk deteksi akurat dan cepat"
}, {
  icon: Cpu,
  title: "Ekstraksi Fitur Tekstur",
  description: "Analisis tekstur lanjutan untuk identifikasi pola penyakit yang presisi"
}, {
  icon: Shield,
  title: "Pencegahan Penyebaran Dini",
  description: "Deteksi cepat untuk tindakan preventif sebelum penyakit menyebar"
}, {
  icon: TrendingUp,
  title: "Peningkatan Produktivitas",
  description: "Optimalkan hasil panen dengan monitoring kesehatan tanaman yang efektif"
}];
const About = () => {
  return <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pertanian Cerdas untuk Petani Teh Modern
          </h2>
          <p className="text-muted-foreground text-xl">Tea-Leaves mengintegrasikan teknologi Deep Learning berbasis arsitektur Convolutional Neural Network (CNN) EfficientNet-B4, yang memanfaatkan analisis fitur dan tekstur daun teh untuk membantu petani mengidentifikasi penyakit tanaman secara cepat, akurat, dan efisien.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border bg-card" style={{
          animationDelay: `${index * 100}ms`
        }}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default About;