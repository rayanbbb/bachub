-- Run this in the Supabase Dashboard → SQL Editor

create table public.user_progress (
  id          uuid         default gen_random_uuid() primary key,
  user_id     uuid         references auth.users(id) on delete cascade not null,
  subject     text         not null,
  course_key  text         not null,
  cours       boolean      default false not null,
  exercices   boolean      default false not null,
  examen      boolean      default false not null,
  updated_at  timestamptz  default now() not null,
  unique(user_id, course_key)
);

alter table public.user_progress enable row level security;

create policy "Users can manage own progress"
  on public.user_progress
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
