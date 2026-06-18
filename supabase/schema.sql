-- ============================================================
-- ハーブ蒸しサロン HP : Supabase スキーマ
-- Supabase ダッシュボード > SQL Editor に貼り付けて Run してください。
-- （何度実行しても安全な冪等スクリプトです）
-- ============================================================

-- 店舗マスタ
create table if not exists public.herb_stores (
  id          text primary key,
  name        text not null,
  sort_order  int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

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

-- 店舗一覧は誰でも読める（予約フォームの店舗選択用）
drop policy if exists herb_stores_public_read on public.herb_stores;
create policy herb_stores_public_read on public.herb_stores
  for select using (true);

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
