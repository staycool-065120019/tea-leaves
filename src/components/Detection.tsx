import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image as ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    severity: string;
    recommendation: string;
  } | null>(null);

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('detect-tea-disease', {
        body: { imageBase64: imageData }
      });

      if (error) throw error;

      setResult({
        disease: data.disease,
        severity: data.severity,
        recommendation: data.recommendation
      });
      toast.success("Analisis selesai!");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Gagal menganalisis gambar. Silakan coba lagi.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null);
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          setPreview(imageData);
          analyzeImage(imageData);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Mohon upload file gambar");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setPreview(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="detection" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Coba Alat Identifikasi
            </h2>
            <p className="text-lg text-muted-foreground">
              Unggah gambar tanaman daun teh untuk analisis otomatis menggunakan CNN EfficientNet-B4
            </p>
          </div>
          
          <Card className="overflow-hidden border-border">
            <CardContent className="p-8">
              {!preview ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    Drag & Drop atau Klik untuk Upload
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Format: JPG, PNG, WEBP (Max 10MB)
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button variant="secondary" className="mt-4">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Pilih File
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-card-foreground">
                        Gambar Upload
                      </h3>
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full rounded-lg border border-border"
                      />
                    </div>
                    
                    {isAnalyzing && !result && (
                      <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <Loader2 className="w-12 h-12 animate-spin text-accent" />
                        <p className="text-muted-foreground">Menganalisis gambar dengan AI...</p>
                      </div>
                    )}

                    {result && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          Hasil Analisis
                        </h3>
                        
                        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                          <p className="text-sm text-muted-foreground mb-1">
                            Penyakit Terdeteksi
                          </p>
                          <p className="text-2xl font-bold text-accent">
                            {result.disease}
                          </p>
                        </div>
                        
                        <div className={`rounded-lg p-4 border ${
                          result.severity === "Tidak Ada" ? "bg-green-500/10 border-green-500/20" :
                          result.severity === "Ringan" ? "bg-yellow-500/10 border-yellow-500/20" :
                          result.severity === "Sedang" ? "bg-orange-500/10 border-orange-500/20" :
                          "bg-destructive/10 border-destructive/20"
                        }`}>
                          <p className="text-sm text-muted-foreground mb-1">
                            Tingkat Keparahan
                          </p>
                          <p className={`text-xl font-semibold flex items-center gap-2 ${
                            result.severity === "Tidak Ada" ? "text-green-500" :
                            result.severity === "Ringan" ? "text-yellow-500" :
                            result.severity === "Sedang" ? "text-orange-500" :
                            "text-destructive"
                          }`}>
                            <AlertCircle className="w-5 h-5" />
                            {result.severity}
                          </p>
                        </div>
                        
                        <div className="bg-card rounded-lg p-4 border border-border">
                          <p className="text-sm font-semibold text-card-foreground mb-2">
                            Rekomendasi Perawatan
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {result.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      setResult(null);
                    }}
                    disabled={isAnalyzing}
                  >
                    Upload Gambar Baru
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Detection;
