import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("eventi")
    .select("*")
    .order("data_evento", { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { titolo, descrizione, data_evento, data_fine, luogo, immagine_url, categoria } = data;

    if (!titolo || !data_evento || !categoria) {
      return Response.json({ error: "Titolo, data e categoria sono obbligatori" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: insertError } = await supabase.from("eventi").insert([
      {
        titolo,
        descrizione,
        data_evento,
        data_fine: data_fine || null,
        luogo: luogo || null,
        immagine_url: immagine_url || null,
        categoria,
      },
    ]);

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return Response.json({ error: "ID richiesto" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: deleteError } = await supabase
      .from("eventi")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return Response.json({ error: deleteError.message }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
