import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Diseases from "@/components/Diseases";
import Detection from "@/components/Detection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Diseases />
      <Detection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
