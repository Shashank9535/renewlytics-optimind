// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://guqqljsjqxhxdklufgyg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1cXFsanNqcXhoeGRrbHVmZ3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NjE5NTAsImV4cCI6MjA1NjMzNzk1MH0.QreaYnx4b8Y5h4KpW7iAHhFeR_irZC1EMixhqzor2nk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);