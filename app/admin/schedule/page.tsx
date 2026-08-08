import { createClient } from "@/lib/supabase/server";
import type { Store } from "@/lib/types";
import { getAdminScope, scopedIds } from "@/lib/auth";
import Schedule from "../Schedule";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const supabase = await createClient();
  const scope = await getAdminScope();

  let storesQuery = supabase.from("herb_stores").select("*").order("sort_order");
  if (!scope.isSuperAdmin) {
    storesQuery = storesQuery.in("id", scopedIds(scope.storeIds));
  }

  const { data: stores } = await storesQuery;
  return <Schedule stores={(stores ?? []) as Store[]} />;
}
