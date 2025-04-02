---
sidebar_position: 16
slug: coming-back-of-decidim-multi-tenant
last_update:
  date: 2025-02-26T06:28:00.000Z
hide_table_of_contents: true
---

# Coming back of Decidim Multi-tenant

## Purpose


I do not like Decidim multi-tenant for now because it will mix all the data and storages in one database, and one bucket. With the update to rails 7, we can handle multiple database, and then create a one db per tenant. 


The purpose of the project is to have no differences between a multi-tenant instance or one instance tenant strategy. The only difference will be the installed modules, that we know we can’t do much for now.


## Will Be Done When


When installing a multi-tenant in decidim requires to add  s3 buckets information, db informations, and other “global” config like the `currency` or `reports_before_hiding`.


## Updates

- Will be planned on Wednsday 26/02 !

