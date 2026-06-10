import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { CancellationStatus } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { id, status, notiz } = await req.json();
  const db = getSupabaseAdmin();

  const { data: current } = await db
    .from("cancellations")
    .select("status")
    .eq("id", id)
    .single();

  const { error } = await db
    .from("cancellations")
    .update({ status, status_updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await db.from("cancellation_events").insert({
    cancellation_id: id,
    from_status: current?.status as CancellationStatus,
    to_status: status as CancellationStatus,
    actor: "admin",
    notiz: notiz || "",
  });

  return NextResponse.json({ success: true });
}
