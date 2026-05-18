---
layout: astro-workflow
theme: dark
body_class: astro-page
hide_theme_toggle: true
title: "Horsehead and Flame Nebulae — WBPP Preprocessing Workflow"
description: "1146 light frames of IC 434 through the ZWO Seestar S50 in EQ mode, stacked in PixInsight using WBPP with local normalization enabled."
date: 2026-05-18
target: IC 434
object_type: "Emission Nebula"
constellation: Orion
ra: "05h 40m 59s"
dec: "−02° 27′ 30″"

gear:
  telescope: "ZWO Seestar S50 · 250mm f/4.8"
  camera: "Built-in CMOS (1080×1920) · OSC / Bayer"
  mount: "Built-in EQ mode (motorized alt-az + field de-rotation)"
  filter: "Built-in LP (light pollution)"
  software: "Seestar app · PixInsight 1.9.4 · WBPP 3.0.1"

capture:
  frames: "1146 lights (1138 registered)"
  exposure: "10 s per frame"
  integration: "~3h 10m"
  gain: "Seestar default"
  location: "Sunnyvale, CA"
  date: "Jan 30–31, 2026"
  bortle: "8 (urban)"
---

## Target

The **Horsehead Nebula (Barnard 33)** is a dark absorption nebula silhouetted against the glowing emission of IC 434, a faint sheet of ionized hydrogen stretching south from the bright star Alnitak in Orion's Belt. Immediately to the west, the **Flame Nebula (NGC 2024)** blazes around Alnitak itself, lit by its ultraviolet output. Together they are among the most recognizable nebulae in the winter sky — and among the most punishing to image from a suburban site. The Horsehead's contrast depends entirely on the faint Ha glow behind it, which a broadband LP filter captures only partially.

---

## Acquisition

The Seestar S50 ran across two nights in **EQ mode**, tracking the field with electronic field de-rotation. Alnitak is bright enough to cause blooming artifacts in long exposures; 10-second subs kept this controlled while still accumulating enough integration time to pull the nebulosity out of the Bortle 8 sky background.

| Parameter | Value |
|-----------|-------|
| Dates | Jan 30–31, 2026 |
| Total frames | 1146 × 10 s |
| Filter | Built-in LP |
| Sensor | 1080×1920 px · Bayer CFA |
| Mode | CFA / OSC |
| Calibration frames | None |

No darks, flats, or bias frames were used. WBPP handled internal calibration estimation from the light frames directly.

---

## WBPP Run — Step by Step

### 1. Light Frame Calibration

WBPP opened all 1146 frames as a single group:

```
Group of 1146 Light frames (1146 active)
SIZE  : 1080×1920  |  BINNING : 1
Filter : LP  |  Exposure : 10.00 s
Color  : CFA  |  Mode : calibration
```

No calibration masters were attached. The run used internal calibration mode.

### 2. Debayering (Demosaicing)

All 1146 frames debayered from raw Bayer CFA to RGB:

- **Pattern:** Auto (auto-detected)
- **Method:** VNG (Variable Number of Gradients)

All 1146 frames completed demosaicing successfully.

### 3. Image Measurements

WBPP measured each debayered frame for FWHM, eccentricity, and SNR. These scores feed directly into the per-frame weights used during integration — worse frames receive lower weight rather than being discarded outright.

### 4. Reference Frame Selection

WBPP auto-selected the best reference for star registration:

```
Best reference: Light_IC 434_10.0s_LP_20260131-192733_d.xisf
```

Selected from the second night (Jan 31), around 19:27 UTC — likely the best atmospheric stability window of the two-night run.

### 5. Image Registration

Star registration ran against the auto-selected reference. **1138 of 1146 frames registered successfully.** 8 frames failed (0.70% rejection rate).

The 8 failed frames cluster as follows:

- **Jan 30 — 20:53, 21:54, 22:10, 22:11, 22:41** (five failures spread across the first night's early and mid session)
- **Jan 31 — 19:35, 19:51, 20:59** (three isolated failures on the second night)

At 0.7% the rejection rate is exceptionally low. No single time cluster stands out — these are likely individual frames with momentary tracking glitches or passing clouds rather than a systemic problem.

### 6. Local Normalization

This run used **local normalization**, unlike the M81 session. WBPP generated a local normalization map for each frame before integration:

```
LN.scale = 270
LN.rejection = true
LN.highClippingLevel = 0.85
LN.referenceRejectionThreshold = 3.00
```

Local normalization corrects frame-to-frame variation in sky background illumination across the field — particularly useful here because:

1. **No flat frames were used.** Without flats, vignetting and illumination gradients vary subtly between frames as the field rotates in EQ mode. Local normalization compensates for this.
2. **Two-night dataset.** Atmospheric conditions and sky background brightness differed between Jan 30 and Jan 31. Local normalization aligns each frame's background model before stacking, preventing the two nights from averaging inconsistently.
3. **Alnitak proximity.** The very bright star at the edge of the field causes a strong local illumination gradient. Local normalization handles this better than global normalization.

### 7. Integration

After local normalization, WBPP integrated the 1138 registered frames using:

- **Rejection method:** Linear Fit Clipping with Local Rejection Normalization
- **Integration:** SNR-weighted average

A separate sub-stack of 20 frames was also integrated at this stage (visible in the log as a `Group of 20 Light frames`) — likely WBPP's internal preview or best-frames sub-stack for registration quality assessment.

---

## Results Summary

| Stage | Input | Output |
|-------|-------|--------|
| Debayering | 1146 CFA frames | 1146 RGB frames |
| Registration | 1146 attempted | 1138 accepted · 8 rejected |
| Stack integration | 1138 × 10 s | ~3h 10m |

**Yield: 99.3%** — exceptional. The two-night dataset integrated cleanly with local normalization compensating for the session-to-session background differences.

---

## Next Steps

- [ ] Background extraction (DBE or GraXpert) — Alnitak gradient will need careful masking
- [ ] Color calibration (SPCC)
- [ ] Noise reduction (NoiseXTerminator)
- [ ] Stretch (GHS) — protect Horsehead contrast during stretch
- [ ] Star reduction — Alnitak will dominate; reduce or mask before final composition
- [ ] Ha enhancement — the Horsehead's contrast lives in the red channel; selective Ha boost may help
- [ ] Final crop and export

---

## Notes and Observations

The LP filter does capture IC 434's Ha emission, but the contrast ratio between the dark Horsehead and the glowing curtain behind it is tight from Bortle 8. More total integration time — ideally 6–8 hours — would significantly improve the signal-to-noise on the nebula body.

The two-night structure worked well. The reference frame auto-selected from the second night suggests Jan 31 had better seeing. Enabling local normalization was the right call for a multi-night OSC dataset without flats; the stack looked notably smoother than the M81 run (same gear, no local normalization) when comparing the linear outputs.

Alnitak will need careful handling in post. Even at 10-second subs the core is saturated. A star mask before any stretching or sharpening pass will prevent it from pulling the rest of the image's tone curve.
