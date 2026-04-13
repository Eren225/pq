// ✅ Ce fichier rassemble UNIQUEMENT la logique de communication avec Supabase (Base de données, Auth).
// ❌ AUCUN code UI ou React (JSX) ne doit se trouver ici.
// TODO pour le développeur Backend: Configurer '@supabase/supabase-js'

export const supabaseClient = {
  // Mock pour l'instant
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
  })
};

export async function fetchUsers() {
  // Exemple de fonction Backend strictement isolée
  const { data, error } = await supabaseClient.from('users').select('*');
  if (error) throw error;
  return data;
}

export async function incrementRollUsage(userId: string) {
  // TODO: Appeler table "usages"
}
