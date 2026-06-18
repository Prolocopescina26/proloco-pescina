import { createClient } from "@supabase/supabase-js";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const dataFile = join(process.cwd(), "public", "data", "soci.json");

export async function GET() {
  try {
    const content = await readFile(dataFile, "utf-8");
    const data = JSON.parse(content);
    return new Response(JSON.stringify({ count: data.sociCount || 0 }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 24 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const { count } = await request.json();
    await writeFile(dataFile, JSON.stringify({ sociCount: count }), "utf-8");
    return new Response(JSON.stringify({ success: true, count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Errore salvataggio" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}