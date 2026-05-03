---
layout: post
title: "Why I still write tests first in 2025"
description: "TDD isn't fashionable anymore. I'm still doing it, and here's the honest reason."
tags: [testing, craft]
date: 2025-02-22
---

Nobody on my team writes tests first. Many of them are better engineers than I am. I still do. Here's why.

## Tests are a design tool

When I write the test first, I have to decide what the interface looks like before I implement it. This forces me to think about the API from the caller's perspective. The result is almost always cleaner than if I'd designed it implementation-first.

> The test is not a description of the implementation. It is a description of the contract. These are different things.

If writing the test is awkward — too many arguments to construct, too much setup, too many mocks — that's the interface telling me it's wrong. That signal is worth more than any code review.

## The fast feedback loop compounds

A test suite I can run in under two seconds changes how I work. I stop context-switching to a browser or a Postman tab. I stop writing "let me just run it and see." The tightness of the loop compounds: each decision is informed by the previous one before the memory of it fades.

## What TDD is not

TDD is not a guarantee of good tests. You can write slow, coupled, brittle tests first just as easily as last. The discipline is about the loop — red, green, refactor — not the form of the test.

It's also not a religion. I don't write a test before fixing a one-line typo. I write a test before any change where I could be wrong about what "correct" means.

That covers most of my work.
