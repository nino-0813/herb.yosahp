import { createClient } from "@/lib/supabase/server";

export type AdminScope = { isSuperAdmin: boolean; storeIds: string[] };

/** ログイン中のユーザーが管理できる店舗の範囲を返す。
 *  isSuperAdmin が true なら全店舗を管理できる（storeIdsは無視してよい）。
 *  false の場合は storeIds に含まれる店舗のみアクセス可能。 */
export async function getAdminScope(): Promise<AdminScope> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { isSuperAdmin: false, storeIds: [] };

  const { data: superAdmin } = await supabase
    .from("herb_super_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (superAdmin) return { isSuperAdmin: true, storeIds: [] };

  const { data: ownedStores } = await supabase
    .from("herb_stores")
    .select("id")
    .eq("owner_user_id", user.id);
  return { isSuperAdmin: false, storeIds: (ownedStores ?? []).map((s) => s.id as string) };
}

/** storeIds が空でも .in() が誤って全件マッチしないよう、ダミー値でフォールバックする */
export function scopedIds(storeIds: string[]): string[] {
  return storeIds.length > 0 ? storeIds : ["__none__"];
}
