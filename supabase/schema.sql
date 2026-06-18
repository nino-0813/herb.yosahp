-- ============================================================
-- ハーブ蒸しサロン HP : Supabase スキーマ（予約カレンダー対応版）
-- Supabase ダッシュボード > SQL Editor に貼り付けて Run してください。
-- 何度実行しても安全な冪等スクリプトです（既存DBにそのまま再実行OK）。
-- ============================================================

-- 店舗マスタ
create table if not exists public.herb_stores (
  id          text primary key,
  name        text not null,
  sort_order  int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- 営業時間・予約枠の設定（店舗ごとに変更可）
alter table public.herb_stores add column if not exists open_time       time    not null default '10:00';
alter table public.herb_stores add column if not exists close_time      time    not null default '20:00';
alter table public.herb_stores add column if not exists slot_minutes    int     not null default 60;   -- 予約枠の長さ（分）
alter table public.herb_stores add column if not exists capacity        int     not null default 1;    -- 同時に受けられる件数（個室/ベッド数）
alter table public.herb_stores add column if not exists closed_weekdays int[]   not null default '{}'; -- 定休曜日 0=日 .. 6=土

-- 予約
create table if not exists public.herb_reservations (
  id            uuid primary key default gen_random_uuid(),
  store_id      text not null references public.herb_stores(id),
  customer_name text not null,
  phone         text,
  email         text,
  menu          text,
  reserved_date date not null,
  reserved_time text not null,
  num_people    int  not null default 1,
  status        text not null default 'pending'
                check (status in ('pending','confirmed','done','cancelled')),
  note          text,
  created_at    timestamptz not null default now()
);

-- 管理者が「枠を埋める／休みにする」ブロック行かどうか
alter table public.herb_reservations add column if not exists is_block boolean not null default false;

create index if not exists herb_reservations_store_date_idx
  on public.herb_reservations (store_id, reserved_date);
create index if not exists herb_reservations_status_idx
  on public.herb_reservations (status);

-- 4店舗（必要に応じて名前を編集）
insert into public.herb_stores (id, name, sort_order) values
  ('onomichi',        '尾道店',     1),
  ('numakuma',        '沼隈店',     2),
  ('fukuyama-ekimae', '福山駅前店', 3),
  ('fukuyama-2',      '福山〇〇店', 4)
on conflict (id) do nothing;

-- RLS 有効化
alter table public.herb_stores       enable row level security;
alter table public.herb_reservations enable row level security;

-- 店舗一覧は誰でも読める（予約フォームの店舗選択・営業時間設定の取得用）
drop policy if exists herb_stores_public_read on public.herb_stores;
create policy herb_stores_public_read on public.herb_stores
  for select using (true);

-- 店舗設定の更新はログイン管理者のみ
drop policy if exists herb_stores_admin_update on public.herb_stores;
create policy herb_stores_admin_update on public.herb_stores
  for update to authenticated using (true) with check (true);

-- 予約は匿名でも作成できる（公開フォーム）
drop policy if exists herb_reservations_anon_insert on public.herb_reservations;
create policy herb_reservations_anon_insert on public.herb_reservations
  for insert with check (true);

-- 閲覧・更新・削除はログイン済み管理者のみ
drop policy if exists herb_reservations_admin_select on public.herb_reservations;
create policy herb_reservations_admin_select on public.herb_reservations
  for select to authenticated using (true);

drop policy if exists herb_reservations_admin_update on public.herb_reservations;
create policy herb_reservations_admin_update on public.herb_reservations
  for update to authenticated using (true) with check (true);

drop policy if exists herb_reservations_admin_delete on public.herb_reservations;
create policy herb_reservations_admin_delete on public.herb_reservations
  for delete to authenticated using (true);

-- ============================================================
-- 空き状況を返す関数（個人情報は返さず「件数」だけを公開）
-- 公開予約フォームの○×表示に使用。anon から呼べる security definer。
-- ============================================================
create or replace function public.herb_slot_counts(p_store text, p_from date, p_to date)
returns table(reserved_date date, reserved_time text, cnt bigint)
language sql
security definer
set search_path = public
as $$
  select reserved_date, reserved_time, count(*)::bigint
  from public.herb_reservations
  where store_id = p_store
    and reserved_date between p_from and p_to
    and status <> 'cancelled'
  group by reserved_date, reserved_time;
$$;

grant execute on function public.herb_slot_counts(text, date, date) to anon, authenticated;
