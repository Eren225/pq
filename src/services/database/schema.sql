-- Schema for Liège Kots (PQ_Counter)

-- 1. Users Table (Extending default auth.users is recommended but for simplicity here's a custom table)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Packs Table (History of bought packs)
CREATE TABLE public.packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  total_rolls INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Ensure only one active pack at a time (Optional rule via triggers, or app logic. For simplicity: App logic)

-- 3. Usages Table (Each roll used)
CREATE TABLE public.usages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  pack_id UUID REFERENCES public.packs(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usages ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read profiles, users can update their own
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Packs: Anyone authenticated can view and insert
CREATE POLICY "Packs are viewable by authenticated users" ON public.packs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert packs" ON public.packs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update packs" ON public.packs FOR UPDATE TO authenticated USING (true);

-- Usages: Anyone authenticated can view and insert
CREATE POLICY "Usages are viewable by authenticated users" ON public.usages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert usages" ON public.usages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Create a Trigger to handle auth.users insertion -> automation into profiles (Optional but convenient)
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
