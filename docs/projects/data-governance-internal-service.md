---
sidebar_position: 20
slug: data-governance-internal-service
last_update:
  date: 2025-04-05T08:36:00.000Z
hide_table_of_contents: true
---

# Data governance internal service

## Purpose


Have a centralized app to manage risks over:

- Dependencies [https://hfroger.ch/notes/supply-chain-and-open-source](https://hfroger.ch/notes/supply-chain-and-open-source)
- Illegal content [https://hfroger.ch/notes/risk-assessment-for-illegal-content](https://hfroger.ch/notes/risk-assessment-for-illegal-content)
- Personal Data Privacy

## Will Be Done When


A centralized db to insert activity, track improvements and review dates.


A log to trace activities related to this db


## Updates


march/2025: start with a budibase integration, going through previous implementation [https://octreegva.notion.site/Template-for-data-governance-of-Voca-d3a2c7ac2f2a48999b5dcf559659648a](https://octreegva.notion.site/Template-for-data-governance-of-Voca-d3a2c7ac2f2a48999b5dcf559659648a)


april/2025: I've made a first draft, and it seems overcomplicated for a simple reason: As decidim add forms, debates, proposals, each components may gather data for different purpose. So it will make sense to have a decidim module, and offer a json API that would be compatible with RGPD (there are some draft json specs around).


