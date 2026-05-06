---
layout: post
title: "Building Terminair: A Read-Only k9s-Style Terminal UI for Apache Airflow"
description: "Why I built a terminal-native Airflow operations tool focused on visibility, safety, and faster production debugging."
tags: [airflow, data-engineering, python, textual, observability]
date: 2026-05-05
---
Apache Airflow is often the control plane for important data work: ingestion, transformations, model scoring, reporting, billing, measurement, and downstream operational jobs. When something breaks, the first question is rarely "which button should I click?" It is usually "what changed, what failed, what is blocked, and how quickly can I narrow the blast radius?"

Terminair is my answer to that workflow: a read-only, k9s-style terminal UI for Apache Airflow. It is designed for engineers who live in terminals, operate production DAGs, and want fast visibility without adding another risky mutation surface.

The project is intentionally practical. It does not try to replace the Airflow web UI. It compresses the views I reach for during debugging into a keyboard-driven interface: DAG status, failed runs, import errors, pools, health, SLA misses, task history, dataset dependencies, XComs, and a watchlist for critical pipelines.

## Why Build Another Airflow Interface?

Airflow already has a web UI, a REST API, logs, metrics, and plenty of ways to inspect state. The problem is not the absence of information. The problem is the number of context switches required during an incident or a time-sensitive investigation.

In a real production workflow, an engineer might need to answer several questions quickly:

- Which DAGs are currently failing?
- Is the failure isolated to one DAG, one task, one pool, or a broader scheduler issue?
- Did a DAG fail because of a bad import, a task error, a dependency delay, or resource pressure?
- Are the critical DAGs healthy, or am I only looking at the loudest failures?
- Can I inspect enough context without accidentally triggering, clearing, or modifying anything?

That last question shaped the entire project. Operational tooling should make the safe path fast. In Airflow, especially in shared production environments, read access and write access deserve different tools, different muscle memory, and different levels of friction.

## The Core Design: Read-Only by Default

Terminair's API client is deliberately read-only. It uses Airflow's REST API, but implements only `GET` operations. There are no trigger, clear, patch, delete, pause, or resume actions.

That constraint is not a missing feature. It is the product boundary.

For a terminal UI, this matters. Terminal workflows are fast, repetitive, and muscle-memory driven. That is useful for navigation and triage, but dangerous for production mutations. By keeping Terminair read-only, I can make the interface dense and keyboard-heavy without making destructive operations one mistyped key away.

The result is a tool that can be used during investigation, pairing, on-call handoff, and production review with a lower operational risk profile.

## What Terminair Shows

The first screen is a DAG overview with state, owner, schedule, next run, and bookmark markers. From there, the UI supports several common debugging paths:

- A combined errors view for failed DAG runs and import errors
- Pools and health screens for resource and scheduler context
- SLA misses for deadline-sensitive pipelines
- Resource timeline and recent activity views
- DAG drill-in with run history and task instances
- Task history for repeated failure patterns
- Dataset dependency inspection
- XCom previews, hidden by default unless explicitly enabled
- A watchlist for critical DAGs that deserve faster access

The goal is not to expose every Airflow API field. The goal is to keep the important operational questions close together.

## Why a Terminal UI?

I took inspiration from `k9s`, which works well because it respects how operators actually move through systems: quick filtering, keyboard navigation, dense tables, drill-down views, and minimal ceremony.

Airflow has a similar operational shape. A DAG is not just a row in a web table. It is connected to runs, tasks, logs, pools, dependencies, schedules, warnings, and external expectations. A terminal UI can make those relationships feel navigable without requiring a browser tab for every angle.

Textual made sense for this project because it brings structured terminal UI primitives to Python: screens, widgets, bindings, tables, async loading, and styling. Since Airflow operators are often already Python and CLI users, the stack stays close to the ecosystem it serves.

## Configuration and Secrets

Terminair supports direct CLI connections for local work and named contexts for repeated use:

```bash
export TERMINAIR_PASSWORD=admin
python3 -m terminair --url http://localhost:8080 --user admin
```

For longer-lived environments, it can load a YAML config from `~/.terminair/config.yaml` or the XDG config directory:

```yaml
connections:
  production:
    url: https://airflow.company.com
    auth:
      type: token
      token: ${AIRFLOW_PROD_TOKEN}

settings:
  default_connection: production
  watchlist:
    - daily_revenue_pipeline
    - critical_measurement_dag
  show_sensitive: false
```

Environment variable expansion keeps secrets out of the config file. Sensitive XCom previews are hidden unless explicitly enabled through config or environment.

These choices are small, but they matter. A useful operations tool should fit into how production credentials are actually handled, not require shortcuts that become bad habits.

## A Demo That Exercises the Workflow

I also added a local demo path. `make demo` starts a sample Airflow Docker stack and launches Terminair against it. That makes the project easier to evaluate without requiring access to a private Airflow instance.

This is important for open source infrastructure tools. A README can describe the interface, but a working demo lets someone feel the navigation model, failure views, and tradeoffs directly.

## Engineering Lessons

The most useful part of building Terminair was not rendering tables in a terminal. It was deciding what the tool should refuse to do.

A few principles became clear:

- Operational tools should separate observation from mutation.
- Dense interfaces are useful when the underlying tasks are repetitive and time-sensitive.
- Read-only does not mean passive; good visibility can materially improve incident response.
- Secrets and sensitive values need boring defaults.
- A project is easier to trust when its boundaries are explicit in code, not just documented in prose.

Terminair is a small project, but it reflects a larger belief from working on production data systems: reliability is not only about schedulers, retries, alerts, and dashboards. It is also about the everyday tools engineers use when they need to understand a system under pressure.

## Try It

The project is available on GitHub:

```bash
git clone https://github.com/ChaitanyaKhoje/terminair.git
cd terminair
make setup
make demo
```

Or run it against an existing Airflow instance with the REST API enabled:

```bash
export TERMINAIR_PASSWORD=your-password
python3 -m terminair --url https://airflow.example.com --user your-username
```

Terminair is still early, but the direction is clear: a safe, terminal-native operations surface for Airflow teams that want faster insight without increasing production risk.
