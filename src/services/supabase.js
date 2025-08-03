import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rekowsqhaexjgxqabgti.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJla293c3FoYWV4amd4cWFiZ3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzQwNTAsImV4cCI6MjA2ODg1MDA1MH0.UrwnwK_BCiH7TFN2DIMoH4H-hVwRNTViIB79P8pAMvM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
