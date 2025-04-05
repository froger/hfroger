---
sidebar_position: 15
slug: single-page-assembly
last_update:
  date: 2025-04-05T08:36:00.000Z
hide_table_of_contents: true
---

# Single Page Assembly

## Purpose


Decidim is quiet a huge data architecture, and does not fit well for very small group that wnat to have their own space.


So this project is to explore how an assembly could be serve as a standalone page, under its own domain name.


## Will be done when


When a small association can use decidim customizing their own color, without having a general Decidim bloated of custom colors.


## Updates


**dec/2024**: created a mockup to send offers and implement the feature. estimated the work.



<figure>
  <img src="/storage/1743842218090.jpeg" alt="" />
  <figcaption>
  
    
  
  </figcaption>
</figure>




**march/2025** We have a working proof of concept! [community.voca.city](http://community.voca.city/) :)


april/2025 we have a draft for final dev architecture. This is done on the max spec, and most likely the PO will prioritize and we will implement a partial architecture.

- An organization can be defined as a generator for multi tenant
- a generator can select
	- a seed template (that requires parameters)
	- a binding machine (stripe callback, decidim survey, proposal)
		- choose the product/ressource
		- for each parameter, bind the corresponding attribute

