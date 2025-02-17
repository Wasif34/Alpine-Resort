import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://awazfccevasvubsusjpd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3YXpmY2NldmFzdnVic3VzanBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTg3NzIsImV4cCI6MjA1NDMzNDc3Mn0.jLBxx34MvN17EE9QzhOk7ZOxIFxgB6qaf-ipv7DL4rc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
