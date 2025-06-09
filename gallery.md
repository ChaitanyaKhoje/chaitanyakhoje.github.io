---
layout: gallery
title: Deep Sky Objects
description: A collection of deep sky astrophotography images
---

# Deep Sky Objects

Welcome to my astrophotography gallery. Here you'll find a collection of deep sky objects captured through my telescope.

## Featured Images

images:
  - path: /assets/images/andromeda.jpg
    title: Andromeda Galaxy (M31)
    description: The closest spiral galaxy to our Milky Way
    equipment: "Telescope: Celestron EdgeHD 8, Camera: ZWO ASI2600MM Pro"
    location: "Dark Sky Site, Arizona"
    date: "2023-12-15"
  
  - path: /assets/images/orion.jpg
    title: Orion Nebula (M42)
    description: A stellar nursery in the constellation Orion
    equipment: "Telescope: Celestron EdgeHD 8, Camera: ZWO ASI2600MM Pro"
    location: "Dark Sky Site, Arizona"
    date: "2023-12-20"

{% assign images = site.static_files | where: "image", true %}
{% for image in images %}
  {% if image.path contains 'gallery' %}
    {% assign title = image.basename | replace: '-', ' ' | capitalize %}
    {% assign description = site.data.gallery[image.basename].description | default: '' %}
    {% assign thumbnail = image.path | replace: '.jpg', '-thumb.jpg' %}
    {% assign url = image.path %}
    {% include gallery-item.html 
      title=title 
      description=description 
      thumbnail=thumbnail 
      url=url 
    %}
  {% endif %}
{% endfor %} 