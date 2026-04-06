(function () {
    const SUPABASE_URL = "https://zqlhyiaqiamptgohjorl.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbGh5aWFxaWFtcHRnb2hqb3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDU1MDMsImV4cCI6MjA5MTA4MTUwM30.fbAKD0kLAv1ruQxPgpp8mlloC95Qf0-RKN8ardTqIXM";

    if (!window.supabase || typeof window.supabase.createClient !== "function") {
        throw new Error("Supabase client library failed to load.");
    }

    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });
})();
