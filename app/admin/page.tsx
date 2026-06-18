import { createClient } from "@/lib/supabase/server";
import type { Reservation, Store } from "@/lib/types";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: reservations }, { data: stores }] = await Promise.all([
    supabase
      .from("herb_reservations")
      .select("*")
      .order("reserved_date", { ascending: true })
      .order("reserved_time", { ascending: true }),
    supabase.from("herb_stores").select("*").order("sort_order"),
  ]);

  return (
    <Dashboard
      initialReservations={(reservations ?? []) as Reservation[]}
      stores={(stores ?? []) as Store[]}
    />
  );
}
