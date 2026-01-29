import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://soiuefhguodwehufofoi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXVlZmhndW9kd2VodWZvZm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MTI2MTEsImV4cCI6MjA4NDk4ODYxMX0.sXX-hIyESRHRKpLe8oPDNPJHgTdFN6_1ZXJ_Hm_rki8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
