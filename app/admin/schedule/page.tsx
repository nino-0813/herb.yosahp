import { createClient } from "@/lib/supabase/server";
import type { Store } from "@/lib/types";
import Schedule from "../Schedule";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const supabase = await createClient();
  const { data: stores } = await supabase.from("herb_stores").select("*").order("sort_order");
  return <Schedule stores={(stores ?? []) as Store[]} />;
}
