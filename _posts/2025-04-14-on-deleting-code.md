---
layout: post
title: "On deleting code"
description: "The most underrated skill on a senior engineering team is removing things. A short essay on why."
tags: [craft, essay]
date: 2025-04-14
---

I've been doing this for a while now, and the engineers I respect most all share a habit: they delete more code than they write. Not in any given week — over a career.

It looks unproductive from the outside. A pull request titled "remove unused flag" doesn't ship features. But it ships understanding. The next person who reads that file will not have to wonder what the flag does, why it exists, whether it's safe to touch.

## Why it's hard

Deleting code requires you to be sure. To be sure, you have to trace callers, understand history, talk to whoever wrote it. That's expensive. Adding code is cheap — you just pile it on top.

> Software is the only engineering discipline where the building gets heavier the longer you maintain it. The only way out is to take pieces off.

Every line of code is a liability dressed up as an asset. It has to be read, tested, secured, deployed, paged on. Most of it earns its keep. Some of it doesn't, and the only way to know which is which is to keep looking.

## How to build the habit

Start small. When you open a file to make a change, spend two minutes looking for something to remove. Not something to refactor — something to delete entirely. An unused import. A flag that's always true. A comment that restates the code.

You won't always find something. When you do, the PR will be tiny and the review will be fast. Over time, the codebase gets lighter. The next person who has to debug it at 2am will thank you, even if they never know your name.
