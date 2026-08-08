import { createClient } from "@/lib/supabase/server";
import type { Reservation, Store } from "@/lib/types";
import { getAdminScope, scopedIds } from "@/lib/auth";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const scope = await getAdminScope();

  let reservationsQuery = supabase
    .from("herb_reservations")
    .select("*")
    .order("reserved_date", { ascending: true })
    .order("reserved_time", { ascending: true });
  let storesQuery = supabase.from("herb_stores").select("*").order("sort_order");

  if (!scope.isSuperAdmin) {
    const ids = scopedIds(scope.storeIds);
    reservationsQuery = reservationsQuery.in("store_id", ids);
    storesQuery = storesQuery.in("id", ids);
  }

  const [{ data: reservations }, { data: stores }] = await Promise.all([reservationsQuery, storesQuery]);

  return (
    <Dashboard
      initialReservations={(reservations ?? []) as Reservation[]}
      stores={(stores ?? []) as Store[]}
    />
  );
}
