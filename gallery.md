---
layout: gallery
title: Astrophotography Gallery
description: A collection of deep space and celestial photography
---

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