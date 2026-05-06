---
layout: post
title: "Building Cosmophile: A Celestial Discovery App for the Sky-Curious"
description: "How I'm building a SwiftUI astronomy app that turns catalog data, sky context, and image-led discovery into a calmer way to explore the night sky."
tags: [swiftui, ios, astronomy, product]
date: 2026-05-06
---
Most astronomy apps ask users to arrive with intent. You search for a catalog number, plan an observing session, check coordinates, compare gear, or inspect a sky map. That works if you already know what you are looking for. It is much less useful when the starting point is simpler: "I looked up tonight and want to understand what is there."

Cosmophile is my attempt to build for that second moment. It is an iOS astronomy app for celestial discovery: image-led, catalog-backed, and designed to explain the sky without making the user feel like they opened a scientific workstation by accident.

The project started closer to an astrophotography utility. It had useful pieces: a deep-sky catalog, gear profiles, visibility math, imaging recommendations, and saved observation plans. But the product identity was too narrow. It assumed the user wanted to plan an observing workflow. The more interesting direction was a calmer guide for sky-curious people who may not know the difference between Messier, NGC, IC, RA, Dec, magnitude, or surface brightness yet.

That pivot shaped the app more than any single screen.

## From Planner to Discovery

The current product direction is built around four surfaces:

- `Today`: a magazine-like daily edition with a featured object, short reading, sky conditions, timeline, and facts.
- `Explore`: the main discovery surface for browsing objects, searching the catalog, and opening image-led details.
- `Saved`: a lightweight personal collection instead of a heavy planner identity.
- `Settings`: where the user's gear profile lives, so recommendations can be computed from their actual setup.

The important change was not just renaming tabs. It was changing the first question the app asks.

A planner asks, "What do you want to observe?" Cosmophile asks, "What is worth noticing?"

That difference leads to different UI. The app should surface recognizable objects, use plain-English labels before raw catalog fields, and let technical detail appear progressively. Coordinates, magnitudes, and Hubble types are still there, but they should not be the first thing a casual user has to parse.

## A Local Catalog First

Cosmophile uses a bundled SQLite catalog built from OpenNGC data. The app ships with thousands of celestial objects: galaxies, nebulae, clusters, stars, and other deep-sky entries. SwiftUI screens read through a GRDB-backed `CatalogDB`, with models like `CelestialObject` mapping catalog fields into app-friendly properties.

That local-first design matters for two reasons.

First, the app can show useful results immediately. Search, category browsing, object metadata, and basic detail screens do not need a network round trip. For a catalog-driven app, first paint should be boringly fast.

Second, the local catalog gives the app a stable spine. Runtime enrichment can improve the experience, but it should not be required for the app to function. If a public image endpoint fails or a metadata service is slow, the user should still be able to browse and learn.

That constraint has shaped the architecture. The local database owns the baseline truth. Network services add context around it.

## Runtime Context Without Turning the App Into a Dashboard

Cosmophile does pull in live context where it helps. Location feeds visibility calculations. Open-Meteo provides weather data used by the Today screen. Image lookups resolve object artwork from Wikipedia when possible and fall back to Aladin thumbnail services when needed.

The trick is deciding where live data belongs.

For example, weather matters because clouds, transparency, moon phase, and seeing conditions change how useful the night sky is. But the Today screen should not become a meteorology dashboard. It needs just enough context to answer whether tonight feels promising.

The same applies to images. A real image makes an object memorable. A gallery of galaxies and nebulae is much more approachable than rows of object codes. But image resolution, source reliability, HTTP behavior, cache policy, and fallback rules quickly become product issues. Cosmophile uses Nuke for image loading and prefetching, adds a user agent for Wikimedia-style sources, caches resolved URLs, and falls back deliberately when a better image cannot be found.

That is the recurring pattern in the app: use live data to make discovery richer, but keep the experience stable when the network is imperfect.

## Gear-Aware, Not Gear-First

One part of Cosmophile still comes from its astrophotography roots: gear-aware recommendations.

The app lets a user enter their telescope and camera profile: focal length, reducer, sensor size, pixel size, camera type, filters, and Bortle class. From there, the app computes field of view, reduced field of view, and image scale. Those derived values feed recommendation logic for framing, filters, and exposure guidance.

That is useful, but it should not dominate the product.

The direction I want is gear-aware, not gear-first. If someone cares about imaging, the app can tell them whether a target fits their field of view, whether a reducer helps, and which filters make sense. If someone is just curious about Andromeda or the Pleiades, they should not have to configure a telescope before the app feels useful.

This balance is one of the harder product calls. Technical depth is valuable, but only if it does not become the default burden.

## The Today Edition

The Today tab is the clearest expression of the new direction. Instead of a utility homepage, it behaves more like an edition.

A bundled JSON file defines featured objects, reading sections, myth/science pairs, timeline milestones, and short wonder cards. One edition might explain Andromeda through scale, history, and myth. Another might use the Pleiades to talk about young stars, reflection nebulosity, and why the Subaru logo has six stars.

This format gives the app a voice.

It also keeps the content deterministic. I do not want an astronomy guide that invents facts at runtime. The app should be able to explain more over time, but that depth should come from structured data, templates, and source-backed enrichment, not from an opaque text generator.

The long-term version of this is a runtime fact graph: short, structured fact nodes that can advance from simple explanation into deeper layers. The first layer might answer "what is it?" The next might explain why distance matters, how we know it, what else is nearby, or why a similar object behaves differently.

## Explore as the Anchor

Explore is the main discovery surface. It combines search, category browsing, editorial story cards, starter objects, and a "what is above me right now" style module that can use location and altitude ranking to recommend visible objects.

The goal is to avoid the blank-canvas problem.

If a user opens the app and does not know what to search for, the app should still offer a path forward. Browse galaxies. Start with famous objects. Open something currently high in the sky. Follow a related object. Save something for later.

The implementation is a mix of straightforward SwiftUI and careful state management: a `NavigationStack`, a gallery view model, a search binding, handoff from Today into Explore, location-aware recommendation refreshes, image prefetch tasks, and a custom detail overlay with matched motion.

None of that is exotic. The harder part is making each entry point land in a coherent object detail experience.

## Designing Against the Metadata Dump

Astronomy data is easy to expose and hard to explain.

A raw detail screen can quickly become a table of values: RA, Dec, magnitude, angular size, constellation, type, Hubble classification, catalog name. Those fields matter, but they are not a story by themselves.

Cosmophile's object detail direction is to start with an image, name, type, short summary, and guided facts. Advanced fields can live behind disclosure. Gear recommendations can appear when relevant. Related objects can be part of the same learning loop.

This is where the design system matters. The app uses a dark, editorial visual language: OLED black, warm white ink, thin rules, astronomy-inspired accent colors, compact kicker labels, serif display type, and quiet motion. The goal is not decoration. The goal is hierarchy. The app should feel calm enough that the user can read, look, and explore without being buried in chrome.

## What Has Been Hard

The hardest parts of Cosmophile have not been the formulas.

The math is important: altitude, best visibility windows, field of view, image scale, and exposure heuristics all need care. But the more persistent challenges are product boundaries:

- How much jargon should be visible by default?
- Which live dependencies are reliable enough for a first-run experience?
- When should the app show a real image, a fallback survey thumbnail, or an intentional illustration?
- How do you keep a local catalog fast while allowing runtime enrichment?
- How do you support astrophotographers without making the app feel like it is only for astrophotographers?

The Sky View work has been especially clarifying. A full scientific sky map is powerful, but it can also be fragile and expert-facing. For Cosmophile, the future Sky View should probably be a lightweight orientation tool, not the center of the product.

## Engineering Lessons

Building Cosmophile has reinforced a few principles:

- A good discovery app needs strong defaults, not just strong search.
- Local data gives the product resilience and speed.
- Runtime enrichment should improve the experience, not hold it hostage.
- Technical depth is more useful when it is progressively disclosed.
- A product can serve experts better by not making every user start in expert mode.

The app is still evolving, but the direction is clear: a celestial guide that makes the night sky feel approachable first, and technically rich only when the user asks for depth.

That is the kind of software I want Cosmophile to become: quiet on the surface, careful underneath, and useful in the gap between curiosity and understanding.
