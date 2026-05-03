---
layout: post
title: "Five Postgres locks I used to misunderstand"
description: "ACCESS EXCLUSIVE isn't the only one that hurts. A field guide to the locks that bit me in production."
tags: [postgres, databases]
date: 2025-03-30
---

I have shipped, by my count, four migrations that took down a database. Each one taught me something I should have known. Here are five locks, in order of how badly they got me.

## 1. ACCESS EXCLUSIVE on `ADD COLUMN` with a volatile default

On Postgres 10 this would rewrite the table. On 11+, a constant default is a metadata-only change. A volatile default (like `now()`) still rewrites. I learned this at 2am.

```sql
-- Safe on PG 11+:
ALTER TABLE users ADD COLUMN tier int DEFAULT 0;

-- Still rewrites the table:
ALTER TABLE users ADD COLUMN created_at timestamptz DEFAULT now();
```

## 2. ROW EXCLUSIVE and concurrent index builds

`CREATE INDEX CONCURRENTLY` does not block reads. But it does two table scans and needs to wait for concurrent transactions to finish. If you have long-running transactions, your index build will stall behind them — and hold a lock that blocks other DDL.

## 3. SHARE UPDATE EXCLUSIVE on `VACUUM`

Manual `VACUUM` takes SHARE UPDATE EXCLUSIVE. So does `CREATE INDEX CONCURRENTLY`. If both are running simultaneously on the same table, one blocks the other. This surprised me the first time a long vacuum blocked my "non-blocking" index build.

## 4. ACCESS SHARE and DDL

The weakest lock — `SELECT` takes it. But it still conflicts with `ACCESS EXCLUSIVE`, which `ALTER TABLE` takes. This is why a long-running OLAP query can block a migration that seems instant in your test environment.

## 5. EXCLUSIVE on `REFRESH MATERIALIZED VIEW`

`REFRESH MATERIALIZED VIEW` without `CONCURRENTLY` takes `EXCLUSIVE`, blocking all reads on the view for the duration of the refresh. Switch to `CONCURRENTLY` as soon as you can. It needs a unique index but is worth it.

The theme across all five: locks interact in ways that don't show up in a dev database with one user and no concurrent traffic. Test migrations under load.
