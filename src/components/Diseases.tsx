import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import algalImage from "@/assets/disease-algal.jpg";
import anthracnoseImage from "@/assets/disease-anthracnose.jpg";
import brownBlightImage from "@/assets/disease-brown-blight.jpg";
import grayBlightImage from "@/assets/disease-gray-blight.jpg";
import healthyImage from "@/assets/disease-healthy.jpg";
import helopeltisImage from "@/assets/disease-helopeltis.jpg";
import miridImage from "@/assets/disease-mirid.jpg";
import miteImage from "@/assets/disease-mite.jpg";
import redSpotImage from "@/assets/disease-red-spot.jpg";
import whiteSpotImage from "@/assets/disease-white-spot.jpg";
const diseases = [{
  name: "Bercak Alga",
  image: algalImage,
  description: "Infeksi alga pada permukaan daun menyebabkan bercak coklat dengan halo kuning",
  risk: "Sedang",
  riskColor: "bg-yellow-500"
}, {
  name: "Antraknosa",
  image: anthracnoseImage,
  description: "Penyakit jamur dengan lesi coklat gelap dan cincin konsentris pada daun",
  risk: "Tinggi",
  riskColor: "bg-red-500"
}, {
  name: "Hawar Coklat",
  image: brownBlightImage,
  description: "Bercak nekrotik coklat besar yang menyebar cepat dan mematikan jaringan daun",
  risk: "Tinggi",
  riskColor: "bg-red-500"
}, {
  name: "Hawar Abu-Abu",
  image: grayBlightImage,
  description: "Pertumbuhan jamur abu-abu keputihan dengan tekstur bubuk pada permukaan daun",
  risk: "Tinggi",
  riskColor: "bg-red-500"
}, {
  name: "Daun Sehat",
  image: healthyImage,
  description: "Daun teh yang sehat dengan warna hijau cerah dan tanpa bercak atau kerusakan",
  risk: "Aman",
  riskColor: "bg-green-500"
}, {
  name: "Helopeltis",
  image: helopeltisImage,
  description: "Kerusakan akibat serangga hama dengan lubang kecil dan perubahan warna coklat",
  risk: "Sedang",
  riskColor: "bg-yellow-500"
}, {
  name: "Kutu Mirid",
  image: miridImage,
  description: "Kerusakan hisap serangga menghasilkan bintik-bintik coklat kecil pada daun",
  risk: "Sedang",
  riskColor: "bg-yellow-500"
}, {
  name: "Tungau",
  image: miteImage,
  description: "Infestasi tungau menyebabkan perubahan warna perunggu dan keriting pada daun",
  risk: "Tinggi",
  riskColor: "bg-red-500"
}, {
  name: "Bercak Merah",
  image: redSpotImage,
  description: "Bercak bundar berwarna merah-oranye dengan tepi jelas akibat infeksi jamur",
  risk: "Sedang",
  riskColor: "bg-yellow-500"
}, {
  name: "Bercak Putih",
  image: whiteSpotImage,
  description: "Bercak pucat atau putih dengan penampilan bubuk akibat infeksi jamur",
  risk: "Sedang",
  riskColor: "bg-yellow-500"
}];
const Diseases = () => {
  return <section id="diseases" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Jenis Penyakit yang Dapat Dideteksi
          </h2>
          <p className="text-lg text-muted-foreground">Sistem ini dapat mengidentifikasi 10 kondisi berbeda pada daun teh, dari penyakit jamur hingga kerusakan hama serangga.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {diseases.map((disease, index) => <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={disease.image} alt={disease.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground text-lg">
                    {disease.name}
                  </h3>
                  <Badge className={`${disease.riskColor} text-white text-xs`}>
                    {disease.risk}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {disease.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Diseases;