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
    const { productInfo, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = language === 'hi' 
      ? 'आप एक सहायक हैं जो भारतीय शिल्पकारों के लिए उत्पाद विवरण बनाते हैं।'
      : 'You are a creative writer specializing in crafting compelling product stories for Indian artisans.';

    const userPrompt = language === 'hi'
      ? `इस हस्तशिल्प उत्पाद के लिए एक आकर्षक कहानी बनाएं: ${JSON.stringify(productInfo)}. कहानी में शिल्प की विरासत, क्षेत्र की संस्कृति और शिल्पकार की यात्रा शामिल होनी चाहिए। 150-200 शब्दों में लिखें।`
      : `Create a compelling product story for this handcrafted item: ${JSON.stringify(productInfo)}. The story should highlight the craft's heritage, the region's culture, and the artisan's journey. Write in 150-200 words, making it emotional and authentic.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const story = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ story }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-product-story:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});