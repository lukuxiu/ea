-- 北邮 801 通信原理刷题网站：Supabase 初始化 SQL
-- 在 Supabase Dashboard -> SQL Editor 中完整运行一次。

create table if not exists public.quiz_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  status text not null check (status in ('mastered','unknown')),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table public.quiz_progress enable row level security;

revoke all on table public.quiz_progress from anon;
grant select, insert, update, delete on table public.quiz_progress to authenticated;

drop policy if exists "users can read own quiz progress" on public.quiz_progress;
drop policy if exists "users can insert own quiz progress" on public.quiz_progress;
drop policy if exists "users can update own quiz progress" on public.quiz_progress;
drop policy if exists "users can delete own quiz progress" on public.quiz_progress;

create policy "users can read own quiz progress"
on public.quiz_progress for select
to authenticated
using (auth.uid() = user_id);

create policy "users can insert own quiz progress"
on public.quiz_progress for insert
to authenticated
with check (auth.uid() = user_id);

create policy "users can update own quiz progress"
on public.quiz_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users can delete own quiz progress"
on public.quiz_progress for delete
to authenticated
using (auth.uid() = user_id);
