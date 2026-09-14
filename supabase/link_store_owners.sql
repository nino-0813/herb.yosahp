-- 4店舗の管理画面を、各オーナーのSupabase Authユーザーに紐づけます。
-- Supabase Dashboard > SQL Editor で実行してください。
-- 4アカウントすべてが存在しない場合は更新せず、エラーで停止します。

begin;

do $$
declare
  matched_users integer;
begin
  select count(*)
    into matched_users
  from auth.users
  where lower(email) in (
    'sionmoeeko@icloud.com',
    'ai01116ai@gmail.com',
    's2-2heqrtp1qce.4.yes-h1luv7-s2@docomo.ne.jp',
    'hre.tomo1217@gmail.com'
  );

  if matched_users <> 4 then
    raise exception '対象のAuthユーザーが4件すべて見つかりません（見つかった件数: %）', matched_users;
  end if;

  update public.herb_stores as store
  set owner_user_id = auth_user.id
  from auth.users as auth_user
  where lower(auth_user.email) = case store.id
    when 'larimar' then 'sionmoeeko@icloud.com'
    when 'larimar-numakuma' then 'ai01116ai@gmail.com'
    when 'cherie-coco' then 's2-2heqrtp1qce.4.yes-h1luv7-s2@docomo.ne.jp'
    when 'cocolu' then 'hre.tomo1217@gmail.com'
  end
  and store.id in ('larimar', 'larimar-numakuma', 'cherie-coco', 'cocolu');
end $$;

commit;

-- 実行結果の確認用。各店舗に正しいメールアドレスが表示されれば完了です。
select
  store.id,
  store.name,
  auth_user.email as owner_email
from public.herb_stores as store
left join auth.users as auth_user on auth_user.id = store.owner_user_id
where store.id in ('larimar', 'larimar-numakuma', 'cherie-coco', 'cocolu')
order by store.sort_order;
