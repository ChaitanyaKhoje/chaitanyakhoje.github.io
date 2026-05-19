---
layout: astro-workflow
theme: dark
body_class: astro-page
hide_theme_toggle: true
title: "Horsehead and Flame Nebulae — Full Processing Workflow"
description: "1146 light frames of IC 434 through the ZWO Seestar S50, stacked in PixInsight with WBPP and processed through DBE, BlurXTerminator, StarXTerminator, statistical stretch, and local contrast enhancement."
date: 2026-05-18
target: IC 434
object_type: "Emission Nebula"
constellation: Orion
ra: "05h 40m 59s"
dec: "−02° 27′ 30″"
tags: [astrophotography, pixinsight, wbpp, seestar, nebula]

astrobin_url: https://app.astrobin.com/u/chaitanyakhoje#gallery

margin_note: "The Horsehead's silhouette held up better than expected against the LP gradient — local normalization across two nights made the difference."
margin_note_date: "Sunnyvale, Jan 30–31"

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

## Post-Processing — Step by Step

The post-processing session ran on 2026-05-18 starting at 02:13 UTC — immediately after WBPP completed. The full sequence from the PixInsight project log:

### 1. Integration (Drizzle stack)

A second ImageIntegration run at `02:13` (~9 minutes) produced the final master light. The project contains both a standard-integration and a drizzle-integrated master (`masterLight_…_drizzle_1x.xisf`, 51.6 MB vs 75.6 MB). The drizzle pass upsamples the stack by 1× — useful at the Seestar's modest 250mm focal length to recover detail that would otherwise be lost to pixel scale aliasing.

### 2. Rotate and Combine

At `02:27`, a `FastRotation` was applied — correcting the field orientation from EQ-mode de-rotation to a natural north-up framing. This was followed immediately by `ChannelCombination` (RGB reassembly) and `DynamicCrop` to trim the rotated image edges.

### 3. Background Extraction (DBE)

`DynamicBackgroundExtraction` ran at `03:00`. DBE fits a polynomial surface to manually-placed background sample points and subtracts it, eliminating the LP gradient and the vignetting roll-off from Alnitak's proximity. With `derivativeOrder = 2` (second-order polynomial), the correction handles modest gradient curvature without over-fitting to the nebula itself.

### 4. Linear Deconvolution (BlurXTerminator — Correct Only)

The first BlurX pass at `02:35` (`correct_only = true`) ran PSF correction without sharpening — tightening star profiles to remove trailing from the Seestar's limited aperture without introducing ringing artifacts. A second full BlurX pass at `02:38` (`correct_only = false`, `sharpen_nonstellar = 0.50`, `sharpen_stars = 0.50`) applied the full sharpening pass to both stars and extended structure.

Both passes used the **BlurXTerminator 4** ML model with `auto_nonstellar_psf = true`, letting the model estimate the PSF from the image rather than requiring a manual PSF measurement.

### 5. Noise Reduction — Linear (NoiseXTerminator)

`NoiseXTerminator 3` ran at `02:42` on the linear (pre-stretch) stack:

```
denoise: 0.90
denoise_color: 0.90
detail: 0.15
iterations: 2
color_separation: true
```

Aggressive denoising (0.9) on the linear stack is safe — the noise model is simpler pre-stretch, and preserving fine nebula detail at `detail = 0.15` prevents the model from over-smoothing the Horsehead's dark edge.

### 6. Star Removal (StarXTerminator)

`StarXTerminator` ran at `02:45`. The `stars = true` mode saves a separate star layer for later recombination. Removing stars before stretch prevents Alnitak's saturated core from anchoring the histogram and pulling the rest of the image dark.

### 7. Green Neutralization (SCNR)

`SCNR` ran twice — once at `02:46` (pre-stretch) and again at `03:07` (post-DBE on a second pass). Both used:

```
colorToRemove: Green
amount: 1.00
protectionMethod: AverageNeutral
preserveLightness: true
```

OSC sensors over-represent green (the Bayer matrix has 2 green pixels per 4), which shows up as a green cast in the sky background after debayering. Full-strength SCNR with average neutral protection removes the cast while preserving luminance.

### 8. Curves Adjustment (Pre-stretch)

Two `CurvesTransformation` passes ran at `02:47` — brief micro-adjustments to the linear data before stretch, likely correcting a residual color cast or nudging the channel balance toward the Ha-dominant red.

### 9. Background Blackpoint (PixelMath)

At `03:42`, three rapid `PixelMath` passes applied a luminance-weighted blackpoint clipping formula:

```
cr=0.2126; cg=0.7152; cb=0.0722;
Med = cr*med($T[0]) + cg*med($T[1]) + cb*med($T[2]);
Sig = 1.4826*(cr*MAD($T[0]) + cg*MAD($T[1]) + cb*MAD($T[2]));
BPraw = Med - 5*Sig;
BP = iif(BPraw < MinC, MinC, BPraw);
Rescaled = ($T - BP) / (1 - BP);
```

This Rec.601-weighted median-and-MAD formula clips the background at 5 sigma below the luminance median and rescales to [0,1]. More robust than a fixed black clip — it adapts to the actual background level after DBE.

### 10. Stretch (Statistical Stretch Script)

At `03:42`, the `statisticalstretch.js` script stretched the image:

```
targetMedian: 0.27
curvesBoost: 0.37
linkedStretch: true
blackpointSigma: 3
numIterations: 1
```

A target median of 0.27 is slightly above the typical 0.2–0.25 range — pushing the midtone brighter to lift the faint IC 434 emission above the noise floor. The `curvesBoost = 0.37` adds an S-curve bump during the stretch for extra contrast. Linked stretch preserves color ratios, avoiding channel drift on the Ha emission.

### 11. Post-Stretch Noise Reduction (NoiseXTerminator)

At `03:42`, a second NoiseXT pass ran on the stretched image with the same parameters (`denoise = 0.90`, `detail = 0.15`). Post-stretch noise reduction catches amplified shadow noise that becomes visible after the histogram stretch.

### 12. Channel Work and Recombination

At `03:45`, `ChannelExtraction` separated the RGB channels — likely to work the red/Ha channel independently. This was followed by a `CurvesTransformation` at `03:42` (logged just before) to enhance the red channel's Ha signal.

### 13. Local Contrast — LocalHistogramEqualization

At `04:15`, `LocalHistogramEqualization` (LHE) ran with:

```
radius: 124
slopeLimit: 2.0
amount: 0.630
histogramBins: 8-bit
circularKernel: true
```

LHE at a 124-pixel radius enhances local contrast across mid-scale structures — useful for bringing out the Horsehead's dark pillar edge against the IC 434 background without over-boosting noise in the flat sky regions. The 2.0 slope limit caps amplification to prevent halos.

### 14. HDR Compression (HDRMultiscaleTransform)

At `04:17`, `HDRMultiscaleTransform` ran with:

```
numberOfLayers: 5
invertedIterations: true
scalingFunction: B3 Spline (5)
largeScaleDeringing: 0.250
toIntensity: true
```

HDRMT with inverted iterations compresses large-scale highlights — particularly Alnitak's blown-out core — while preserving the fine nebula detail captured in the lower wavelet layers. The B3 Spline 5-layer decomposition reaches down to ~32-pixel structures.

### 15. Curves and Final Noise Passes

Three final `CurvesTransformation` passes ran between `04:22–04:30` — fine-tuning the tone curve to taste. Two more `NoiseXTerminator` passes at `04:24` and `04:39` (each ~2–3 seconds) cleaned up noise introduced by the LHE and HDRMT contrast passes.

---

## Results Summary

| Stage | Input | Output |
|-------|-------|--------|
| Debayering | 1146 CFA frames | 1146 RGB frames |
| Registration | 1146 attempted | 1138 accepted · 8 rejected |
| Stack integration | 1138 × 10 s | ~3h 10m |
| Post-processing | Linear master | Fully processed RGB |

**Yield: 99.3%** — exceptional. The Horsehead's dark silhouette and the Flame's thermal structure both resolved cleanly from a Bortle 8 site.

---

## Notes and Observations

The two-night structure worked well. Enabling local normalization was the right call — the stack was notably smoother than single-night OSC datasets. The reference frame auto-selected from the second night confirms Jan 31 had better seeing.

The statistical stretch at `targetMedian = 0.27` was deliberately aggressive: lifting the faint IC 434 emission meant accepting a slightly brighter background, but the LP gradient was well-corrected by DBE and SCNR beforehand. Alnitak's core is fully saturated in the final image; HDRMultiscaleTransform compressed the halo substantially but couldn't recover detail that wasn't captured in 10-second subs.

StarXTerminator removing stars before stretch was important for this field. Without it, Alnitak would have dominated the histogram and crushed the nebula midtones.

The PixelMath blackpoint formula was a particularly useful pattern — the Rec.601-weighted median approach adapts cleanly to backgrounds that aren't uniformly dark after DBE, which is the case here with IC 434's diffuse Ha emission occupying a large fraction of the frame.
