import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `Kamu adalah ahli agronomis yang menganalisis kesehatan tanaman teh berdasarkan gambar daun.

Analisis gambar daun teh dengan teliti dan identifikasi kondisinya berdasarkan karakteristik visual yang spesifik.

PENYAKIT YANG DAPAT DIDETEKSI DAN KARAKTERISTIKNYA:

1. Algal Leaf Spot (Bercak Daun Alga)
   - Bercak hijau kebiruan atau hijau keabu-abuan di permukaan daun
   - Tekstur seperti beludru atau seperti karat
   - Biasanya di daun yang lebih tua

2. Anthracnose (Antraknosa)
   - Bercak coklat atau hitam dengan tepi yang jelas
   - Lesi melingkar atau tidak beraturan
   - Dapat menyebabkan daun mengering dan rontok

3. Brown Blight (Hawar Coklat)
   - Bercak coklat yang meluas dengan cepat
   - Daun menguning di sekitar area terinfeksi
   - Dapat mempengaruhi batang dan cabang

4. Gray Blight (Hawar Abu-abu)
   - Bercak abu-abu atau keperakan
   - Pertumbuhan jamur abu-abu pada permukaan daun
   - Sering muncul di kondisi lembab

5. Red Spot (Bercak Merah)
   - Bercak merah atau merah kecoklatan yang mencolok
   - Lesi bulat dengan pusat lebih gelap
   - Dapat menyebar ke seluruh permukaan daun

6. White Spot (Bercak Putih)
   - Bercak putih atau putih keabu-abuan
   - Tekstur seperti bubuk atau tepung
   - Biasanya di permukaan atas daun

7. Helopeltis (Serangan Hama Helopeltis)
   - Bercak coklat kecil dengan lubang di tengah
   - Kerusakan tusukan yang khas
   - Daun dapat melengkung atau mengering

8. Mirid (Serangan Hama Mirid)
   - Bercak kecil seperti titik coklat atau hitam
   - Kerusakan tusukan pada jaringan daun
   - Daun dapat menguning atau kerdil

9. Mite (Serangan Tungau)
   - Daun tampak pucat atau keperakan
   - Bintik-bintik kecil kuning atau putih
   - Daun dapat menggulung atau mengering
   - Sering ada jaring halus di permukaan daun

10. Sehat
    - Warna hijau segar dan merata
    - Tidak ada bercak, lubang, atau perubahan warna
    - Permukaan halus dan mengkilap

TINGKAT KEPARAHAN:
- Tidak Ada: Daun sehat, tidak ada gejala penyakit
- Ringan: Kurang dari 10% area daun terpengaruh, gejala awal
- Sedang: 10-30% area daun terpengaruh, gejala jelas terlihat
- Parah: Lebih dari 30% area daun terpengaruh, kerusakan signifikan

Berikan respons dalam format JSON dengan struktur berikut:
{
  "disease": "nama penyakit yang paling sesuai atau 'Sehat'",
  "severity": "Tidak Ada/Ringan/Sedang/Parah",
  "recommendation": "rekomendasi perawatan yang spesifik dan praktis dalam bahasa Indonesia"
}

PENTING: Analisis dengan teliti setiap detail visual pada daun. Jika tidak yakin 100%, pilih penyakit yang paling mendekati karakteristik yang terlihat.`;

    console.log("Calling Lovable AI for disease detection...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: systemPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analisis gambar daun teh ini dan identifikasi penyakitnya."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "detect_tea_disease",
              description: "Deteksi penyakit daun teh dan berikan rekomendasi",
              parameters: {
                type: "object",
                properties: {
                  disease: {
                    type: "string",
                    description: "Nama penyakit yang terdeteksi atau 'Sehat'"
                  },
                  severity: {
                    type: "string",
                    enum: ["Tidak Ada", "Ringan", "Sedang", "Parah"],
                    description: "Tingkat keparahan penyakit"
                  },
                  recommendation: {
                    type: "string",
                    description: "Rekomendasi perawatan dalam bahasa Indonesia"
                  }
                },
                required: ["disease", "severity", "recommendation"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "detect_tea_disease" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Terlalu banyak permintaan. Silakan coba lagi nanti." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Layanan AI memerlukan kredit. Silakan hubungi administrator." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Gagal menganalisis gambar" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data));

    // Extract structured output from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback if no tool call
    return new Response(
      JSON.stringify({ 
        error: "Tidak dapat menganalisis gambar. Format respons tidak sesuai." 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in detect-tea-disease function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak terduga" 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
