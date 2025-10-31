-- Create artisans table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'artisans') THEN
    CREATE TABLE public.artisans (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      bio TEXT,
      craft_journey TEXT,
      region TEXT,
      craft_type TEXT,
      awards TEXT[],
      milestones JSONB,
      portfolio_images TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create products table if not exists  
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
    CREATE TABLE public.products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      artisan_id UUID REFERENCES public.artisans(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      ai_generated_story TEXT,
      price DECIMAL(10,2) NOT NULL,
      category TEXT,
      materials TEXT[],
      region TEXT,
      craft_type TEXT,
      images TEXT[],
      stock_quantity INTEGER DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 0,
      reviews_count INTEGER DEFAULT 0,
      is_featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create orders table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
    CREATE TABLE public.orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      total_amount DECIMAL(10,2) NOT NULL,
      status TEXT CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
      shipping_address TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create order_items table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'order_items') THEN
    CREATE TABLE public.order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
      product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
END $$;

-- Create wishlists table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'wishlists') THEN
    CREATE TABLE public.wishlists (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, product_id)
    );
  END IF;
END $$;