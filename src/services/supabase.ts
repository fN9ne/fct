import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://grmqlhncanrqlbjounck.supabase.co";
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybXFsaG5jYW5ycWxiam91bmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNTMwODgsImV4cCI6MjAzNjcyOTA4OH0.7kJ59LwQpNf5AJud9709Bk8YEqcpa6eaQm-pGW4uRbE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
