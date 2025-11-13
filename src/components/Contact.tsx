import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Shield } from "lucide-react";
const contactMethods = [{
  icon: Mail,
  title: "Email",
  value: "tea-leaves@support.xyz",
  description: "Kirim pertanyaan Anda kapan saja"
}, {
  icon: MessageCircle,
  title: "Chat Langsung",
  value: "Tersedia: 09.00 - 17.00 WIB",
  description: "Respon cepat untuk pertanyaan mendesak"
}, {
  icon: Phone,
  title: "Telepon",
  value: "+62 8123456789",
  description: "Hubungi tim support kami"
}];
const Contact = () => {
  return <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Hubungi </h2>
          <p className="text-lg text-muted-foreground">Siap membantu untuk melindungi kebun teh dari penyakit</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                  <method.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-lg font-medium text-accent mb-2">
                  {method.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
        
        <Card className="bg-gradient-to-r from-primary to-primary/90 border-none text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent animate-float" />
            <h3 className="text-3xl font-bold mb-4">Lindungi Kebun Teh Sekarang!</h3>
            <p className="mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-xl">Identifikasi dini penyakit daun teh untuk menjaga tanaman tetap sehat dan mempertahankan hasil panen. Gunakan Tea-Leaves sekarang.</p>
            <Button variant="hero" size="xl" className="shadow-lg">
              Mulai Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>;
};
export default Contact;