import { createClient } from "@/lib/supabase/server";
import type { Store } from "@/lib/types";
import Stores from "../Stores";

export const dynamic = "force-dynamic";

export default async function StoresPage() {
  const supabase = await createClient();
  const { data: stores } = await supabase.from("herb_stores").select("*").order("sort_order");
  return <Stores stores={(stores ?? []) as Store[]} />;
}
