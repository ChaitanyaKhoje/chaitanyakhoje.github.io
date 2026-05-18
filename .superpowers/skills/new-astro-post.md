---
name: new-astro-post
description: Create a new astrophotography workflow post for chaitanyakhoje.github.io. Parses PixInsight WBPP logs and project files, extracts session stats and processing steps, and scaffolds a structured post using the astro-workflow layout with a sticky gear sidebar.
---

# new-astro-post

Create a structured astrophotography workflow post from a PixInsight session — WBPP preprocessing, post-processing, or both.

## When to use

Invoke this skill whenever the user wants to document a new astrophotography processing session. It ensures every post is consistent in structure, front matter, and depth.

## Required inputs

The user must provide at least one of:
- Path(s) to WBPP log files (`*.log`)
- Path to a PixInsight project file (`.pxiproject` bundle containing `project.xosm`)
- Gear used (scope, camera, mount, filter, software)
- Target name

Everything else is derived from the logs or asked inline.

## Step 1 — Parse the logs

Read all provided log files. Extract:

| Field | Where to find it |
|-------|-----------------|
| Target name | Filename pattern: `Light_<TARGET>_…` |
| Frame count | `Group of N Light frames` |
| Sensor size | `SIZE : WxH` |
| Binning | `BINNING : N` |
| Filter | `Filter : <name>` |
| Exposure | `Exposure : N.NNs` |
| Color mode | `Color : CFA` or `RGB` |
| Demosaic method | `DB.debayerMethod = Debayer.<METHOD>` |
| CFA pattern | `DB.cfaPattern = Debayer.<PATTERN>` |
| Best reference frame | `Best reference frame: …` (filename + timestamp) |
| Registered count | `Registration completed: N images out of M` |
| Failed registrations | Lines matching `** Warning: Registration failed for image:` |
| Local normalization | Presence/absence of `LOCAL NORMALIZATION` section |
| Stacking method | Lines matching `INTEGRATION` section |

Compute derived values:
- **Rejected frames** = total − registered
- **Rejection rate** = rejected / total × 100
- **Total integration** = registered × exposure_seconds / 60 → format as `X min` or `X h Y min`

Identify **failure clusters** by grouping failed frame timestamps (extract from filename `…_YYYYMMDD-HHMMSS_d.xisf`) into time windows. Flag if clusters appear at session start (mount settling), end (meridian flip, horizon), or mid-session (weather, tracking).

## Step 1b — Parse the PixInsight project file (post-processing)

If the user also provides a `.pxiproject` bundle (a folder ending in `.pxiproject`), extract the full post-processing workflow from `project.xosm`.

**The `.xosm` file is large binary XML. Do not read it directly. Use targeted extraction:**

```bash
# List all process classes used in the project
strings project.xosm | grep -E 'class="[A-Z]' | sed 's/.*class="//; s/".*//' | sort -u

# Get chronological execution order (sort by timestamp)
python3 -c "
import re, sys
content = open('project.xosm', 'rb').read().decode('utf-8', errors='ignore')
execs = re.findall(r'class=\"([^\"]+)\" version=\"\d+\" enabled=\"true\">\s*<time start=\"([^\"]+)\" span=\"([^\"]+)\"', content)
for cls, start, span in sorted(execs, key=lambda x: x[1]):
    print(f'{start[:19]} ({float(span):.2f}s) — {cls}')
"

# Get all named process instances with their key parameters
python3 -c "
import re, sys
content = open('project.xosm', 'rb').read().decode('utf-8', errors='ignore')
for cls, id_, body in re.findall(r'<instance class=\"([^\"]+)\" version=\"\d+\" id=\"([^\"]+)\"[^>]*>(.*?)(?=<instance class=|</instances>)', content, re.DOTALL):
    if id_.endswith('_instance'):
        params = re.findall(r'<parameter id=\"([^\"]+)\" value=\"([^\"]+)\"', body)
        if params:
            print(f'\n=== {cls} ({id_}) ===')
            for k, v in params[:10]: print(f'  {k}: {v}')
"
```

Extract:

| Field | Where to find it |
|-------|-----------------|
| Process sequence | `<time start=…>` in chronological order (sort by timestamp) |
| Tool names | `class="…"` on `<instance>` elements |
| Named process icons | `<icon id="…">` — the user-assigned names tell you the workflow intent (e.g., `BlurXCorrectOnly`, `NoiseXTAfterStretch`) |
| Key parameters | `<parameter id="…" value="…">` inside each named instance |
| Script parameters | `<table id="parameters">` rows for `Script` instances |

**Important: handle undo/redo correctly.** The same process class may appear multiple times. The **chronological execution order** (by `<time start=…>`) is the ground truth. Icon names in the project (e.g., `DBE`, `StarXT`, `StarXTAfterDBE`) reflect the user's actual workflow intent — use those names in your prose to describe what each step was for. If an icon name suggests a retry or variant (e.g., `BlurXCorrectOnly` vs `BlurX`), note the distinction.

**Standard post-processing sequence for Seestar/OSC data** (in typical order — not all steps present in every session):

1. ImageIntegration (drizzle or standard) — if WBPP didn't integrate
2. FastRotation + ChannelCombination — orient and assemble RGB
3. DynamicCrop — trim rotation edges
4. BlurXTerminator (correct_only=true first pass, then full sharpen) — PSF correction + sharpening
5. NoiseXTerminator — noise reduction on linear stack
6. DynamicBackgroundExtraction (DBE) — remove LP gradient
7. StarXTerminator (stars=true) — extract stars before stretch
8. SCNR — neutralize green cast from Bayer oversampling
9. CurvesTransformation — pre-stretch channel balance
10. PixelMath blackpoint formula — luminance-weighted background clip
11. Statistical Stretch or GHS — non-linear stretch to target median
12. NoiseXTerminator (post-stretch) — clean up amplified shadow noise
13. ChannelExtraction + Ha enhancement — boost red channel
14. LocalHistogramEqualization — local contrast
15. HDRMultiscaleTransform — compress bright star halos
16. CurvesTransformation (final) — tone curve polish
17. Star recombination (PixelMath or ChannelCombination)
18. DynamicCrop + export

## Step 2 — Ask for missing gear

If the gear cannot be inferred from the logs, ask inline (plain text, not AskUserQuestion):

```
I have the capture stats from the logs. What gear did you use?
Telescope/optics, camera, mount, filter(s), capture software — anything you want in the sidebar.
```

For ZWO Seestar S50 sessions, the gear is fully known:
- **Telescope:** ZWO Seestar S50 · 250mm f/4.8
- **Camera:** Built-in CMOS (1080×1920) · OSC / Bayer
- **Mount:** Built-in EQ mode (motorized alt-az + field de-rotation)
- **Filter:** Built-in LP (light pollution)
- **Software:** Seestar app · PixInsight [version from log] · WBPP [version from log]

## Step 3 — Generate the front matter

Use this exact YAML structure. Every field maps directly to the Observatory Notebook layout's sidebar and hero section:

```yaml
---
layout: astro-workflow
theme: dark
body_class: astro-page
hide_theme_toggle: true
title: "<TARGET_FULL_NAME> — <WORKFLOW_TYPE> Workflow"
description: "<N> light frames through the <SCOPE> in <MOUNT_MODE>, stacked in PixInsight using <WORKFLOW_NAME> <with/without> local normalization."
date: YYYY-MM-DD
target: <TARGET_SHORT>
object_type: "<Emission Nebula | Galaxy | Globular Cluster | etc.>"
constellation: "<constellation name>"
tags: [astrophotography, pixinsight, wbpp, <scope_tag>, <object_type>]

# Image paths — include when final image is available; omit to use SVG placeholder
# hero_image: /assets/images/posts/<slug>/final.jpg
# hero_image_caption: "Final processed image — <details>"
# before_image: /assets/images/posts/<slug>/raw.jpg
# after_image: /assets/images/posts/<slug>/final.jpg

# Copy final image to: assets/images/posts/<slug>/<filename>
# Use lowercase hyphenated filenames. PNG or JPG both work.

# Optional: margin note shown in hero aside
margin_note: "<Short atmospheric field note from the session>"
margin_note_date: "<Location or date — e.g. 'Backyard, Apr 18'>"

gear:
  telescope: "<scope> · <focal_length> <focal_ratio>"
  camera: "<camera_name> (<resolution>) · <color_mode>"
  mount: "<mount_name> (<mode if notable>)"
  filter: "<filter_name>"
  software: "<capture_sw> · <processing_sw> · <script_name>"

capture:
  frames: "<N> lights (<registered> registered)"
  exposure: "<X> s per frame"
  integration: "~<total_min> min total"
  gain: "<gain_value or 'Seestar default'>"
  location: "<city, state>"
  date: "<Month D–D, YYYY>"
  bortle: "<N> (<description>)"
---
```

**Title conventions:**
- Workflow type: `WBPP Preprocessing Workflow`, `Calibration Workflow`, `Integration Workflow`
- Use the full common name for well-known objects: `M81 Bode's Galaxy`, `M42 Orion Nebula`, `NGC 7293 Helix Nebula`
- For the `target` field use just the catalog ID: `M81`, `NGC 7293`

**Tag conventions:**
- Always include: `astrophotography`, `pixinsight`, `wbpp`
- Add scope tag: `seestar` for Seestar S50, `refractor`, `reflector`, `newt` etc.
- Add object type: `galaxy`, `nebula`, `cluster`, `planetary`

## Step 4 — Write the post body

Every workflow post MUST follow this exact section structure. Do not omit sections; use a `_To be documented._` placeholder if content is not yet available.

```markdown
## Target

[2–3 sentences: what the object is, distance/size/magnitude, why it's interesting or why this target was chosen for this session.]

---

## Acquisition

[1–2 sentences on how the mount/scope was set up for this session — any special modes, polar alignment approach, notable conditions.]

[Acquisition summary table:]
| Parameter | Value |
|-----------|-------|
| Date | ... |
| Total frames | ... |
| Filter | ... |
| Sensor | ... |
| Mode | CFA/RGB/Mono |
| Calibration frames | None / Darks + Flats / ... |

[1 sentence on calibration frame decision and why.]

---

## WBPP Run — Step by Step

### 1. Light Frame Calibration

[What WBPP did in this stage. Quote the group summary from the log. Explain if calibration masters were attached or not.]

### 2. Debayering (Demosaicing)

[Only include if CFA/OSC data. State the CFA pattern and debayering method chosen, and briefly explain why that method was used.]

### 3. Image Measurements

[Describe what WBPP measured and how those measurements feed into the weighting for stacking.]

### 4. Reference Frame Selection

[Quote the best reference frame path. Note the timestamp and what it likely represents (best seeing window, etc.).]

### 5. Image Registration

[State registered/total count and rejection rate. Describe the failure clusters by timestamp — what might have caused them. Assess whether the yield is acceptable.]

### 6. Stacking (No Local Normalization) OR ### 6. Stacking (With Local Normalization)

[Explain the stacking parameters chosen. For the local normalization decision specifically:]

**With local normalization:** State why it was used — vignetting variation, no flat frames, alt-az field rotation producing gradient drift across the session.

**Without local normalization:** State why it was skipped — flat frames present, tracking was consistent, target object type (extended nebulosity risk), or intentional test.

[Describe the output: linear/stretched, color space, ready for next steps.]

---

## Post-Processing — Step by Step

[Omit this section entirely if no post-processing log was provided.]

[One sentence framing: date and time post-processing started relative to WBPP, and the overall approach.]

[For each executed process in chronological order, one sub-section (###). Use the icon name from the project (e.g., `BlurXCorrectOnly`, `NoiseXTAfterStretch`) as a hint for the prose framing. Always include:]

### N. [Tool Name] [(optional context note)]

[1–2 sentences: what this step does and why it was needed for this specific image.]

[If the tool has meaningful parameters, show the key ones in a code block:]

```
param: value
param: value
```

[1 sentence: what the output looked like or what problem it solved.]

[Repeat for each step. Combine closely-related steps (e.g., 3 PixelMath passes in 1 second = single formula application) rather than listing each execution separately.]

---

## Results Summary

| Stage | Input | Output |
|-------|-------|--------|
| Debayering | N CFA frames | N RGB frames |
| Registration | N registered | N accepted · N rejected |
| Stack integration | N × X s | ~Y min |

**Yield: XX%** — [one-sentence assessment]

---

## Next Steps

- [ ] Background extraction (DBE or ABE)
- [ ] Color calibration (SPCC or manual white balance)
- [ ] Noise reduction (NoiseXTerminator or MMT)
- [ ] Stretch (HistogramTransformation or GHS)
- [ ] Sharpening (DeconvolutionSpectralWeighting or UnsharpMask on luminance)
- [ ] Final crop and export

[Add or remove steps based on what was actually done and what remains.]

---

## Notes and Observations

[Free-form: anything that stood out during the session or processing run. Tracking behavior, weather events visible in the registration failures, unusual rejection clusters, things to try differently next time. Include screenshot captions if screenshots are attached.]

[For each attached screenshot, add:]
![Screenshot description]({{ '/assets/images/posts/<slug>/<filename>' | relative_url }})
*Caption: what the screenshot shows and why it matters.*
```

## Step 5 — Choose the filename and slug

```
YYYY-MM-DD-<target-slug>-<workflow-slug>.md
```

Examples:
- `2026-05-17-m81-bodes-galaxy-wbpp-workflow.md`
- `2026-06-01-m42-orion-nebula-wbpp-workflow.md`
- `2026-07-15-ngc7293-helix-nebula-calibration-workflow.md`

Use the post date (today's date by default, or the session date if specified).

## Step 6 — Place screenshots

If the user attaches screenshots during the conversation, place them at:

```
assets/images/posts/<post-slug>/<screenshot-filename>
```

Reference them in the **Notes and Observations** section using the pattern shown in Step 4.

## Step 7 — Verify and create

Before writing:
1. Confirm target name and date with the user if ambiguous
2. Write the file to `_posts/`
3. Report: filename created, gear panel fields populated, word count, any log fields that could not be extracted (list them so the user can fill them in)

## Layout reference — Imaging Dashboard

Posts using `layout: astro-workflow` render the **Imaging Dashboard** design:

- **Mission bar (two rows):** sticky; top row = status strip (OPERATIONAL dot, date, target, session/channel), bottom row = horizontal scroll-spy TOC built from `h2` headings
- **Hero panel:** `CornerPanel` with teal corner brackets containing:
  - Telemetry band: big-number readouts for integration, subs, gain, Bortle from `capture.*`
  - Title row: large serif H1 + subtitle, date/location right-aligned
  - Image frame (21:9, HUD overlay): RA/Dec vertical text, compass, scale bar, CSS corner brackets; uses `hero_image` or SVG nebula placeholder
  - Tab strip (Final / Starless / Annotated / Linear / Raw stack)
  - Action bar (Fullscreen, Download links)
- **Body grid:** main content left + 260px sticky right sidebar
- **Right sidebar panels** (`CornerPanel` with teal/blue/red accents):
  1. OBJECT — target, constellation, RA, Dec, magnitude, distance from front matter
  2. CAPTURE LOG — frames, exposure, integration, gain, date, location, Bortle
  3. GEAR — short names for telescope, camera, mount, filter
- **Gear section:** rendered from `gear.*` as a 2-column grid of `CornerPanel` cards + software pills
- **Prose styles:** `.db-prose` — serif body, monospace uppercase `h2` with `§` prefix and color dashed underline, `blockquote` as callout panel, `pre`/`code` on dark bg
- **Before/After slider:** rendered if `before_image` + `after_image` set; drag-to-compare with STAGE A/B/C footer
- **Background:** scanline overlay + seeded star dots
- On mobile (≤860px): sidebar becomes a horizontal flex row; on ≤480px stacks vertically

## Consistency rules

- Always use `layout: astro-workflow` — never `layout: post`
- Back link always points to `/astrophotography/`, not `/`
- All section headings are `##` (H2) — never H3 as the top-level section
- Sub-steps within WBPP are `###` (H3)
- The `---` horizontal rule separates major sections
- Next Steps is always a task checklist `- [ ]`
- Results Summary always uses the three-row table format shown above
