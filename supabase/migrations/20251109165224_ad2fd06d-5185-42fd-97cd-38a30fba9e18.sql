-- Add ar_model_url column to products table for AR functionality
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS ar_model_url text;

COMMENT ON COLUMN public.products.ar_model_url IS 'URL to the 3D model file for AR viewing (.glb format)';

-- Insert a test product with AR model for testing
INSERT INTO public.products (
  name,
  description,
  price,
  stock_quantity,
  category,
  craft_type,
  region,
  materials,
  images,
  ar_model_url,
  is_featured,
  artisan_id
)
SELECT
  'Handcrafted Blue Pottery Vase',
  'A beautiful handcrafted blue pottery vase with intricate traditional patterns. This stunning piece showcases the ancient art of blue pottery, featuring delicate floral motifs hand-painted by skilled artisans.',
  2499.00,
  5,
  'Home Decor',
  'Blue Pottery',
  'Rajasthan',
  ARRAY['Clay', 'Natural Dyes', 'Quartz Stone Powder'],
  ARRAY['/src/assets/blue-pottery.jpg'],
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb',
  true,
  a.id
FROM public.artisans a
LIMIT 1
ON CONFLICT DO NOTHING;