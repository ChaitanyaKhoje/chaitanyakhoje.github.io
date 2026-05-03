---
layout: post
title: "What I finally understood about Rust's async state machines"
description: "The .await keyword is sugar for something specific and beautiful. Here is the model that finally clicked."
tags: [rust, concurrency]
date: 2025-03-11
---

For two years I wrote async Rust by pattern matching on examples. It worked, mostly. Then I had to debug a `Send` bound error and realized I had no mental model at all.

## Futures are state machines

When you write an async function, the compiler transforms it into a struct that implements `Future`. Each `.await` point becomes a state in that struct. Polling the future drives the state machine forward.

```rust
async fn fetch_user(id: u64) -> Result<User, Error> {
    let row = db.query_one(id).await?;
    let user = User::from_row(row)?;
    Ok(user)
}
```

The compiler sees two suspension points: the `.await` on `query_one`, and the implicit end. It generates something like:

```rust
enum FetchUserFuture {
    State0 { id: u64 },
    State1 { row_future: QueryOneFuture },
    Done,
}
```

## Why `Send` bounds are about state, not calls

A `Future` is `Send` if all the state it holds across `.await` points is `Send`. Not the types you *use* — the types that are *alive* when the future yields.

This is why holding a `Rc<T>` across an `.await` breaks `Send`: the `Rc` lives in the state machine struct, which then can't be sent across threads.

```rust
// This won't compile if you need Send:
async fn bad() {
    let rc = Rc::new(42);
    some_async_fn().await;  // rc is alive here, across the await
    println!("{}", rc);
}
```

The fix is to drop the non-`Send` value before the `.await`, or use `Arc` instead.

## The executor is just a loop

An executor calls `poll()` on your future. If it returns `Pending`, the executor parks it and moves on. When the waker fires (because IO completed, a timer expired, etc.), the executor queues the future to be polled again.

That's it. There's no magic. Understanding this made async Rust feel like a system I control rather than a system that controls me.
