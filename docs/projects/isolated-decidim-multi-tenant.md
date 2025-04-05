---
sidebar_position: 18
slug: isolated-decidim-multi-tenant
last_update:
  date: 2025-04-05T08:36:00.000Z
hide_table_of_contents: true
---

# Isolated Decidim Multi-tenant

## Purpose


I do not like Decidim multi-tenant for now because it will mix all the data and storages in one database, and one bucket. With the update to rails 7, we can handle multiple database, and then create a one db per tenant. 


The purpose of the project is to have no differences between a multi-tenant instance or one instance tenant strategy. The only difference will be the installed modules, that we know we can’t do much for now.


## Will Be Done When


When installing a multi-tenant in decidim requires to add  s3 buckets information, db informations, and other “global” config like the `currency` or `reports_before_hiding`.


## Updates

- Will be planned on Wednesday 26/02 !
- Update april/2025: we start the project beginning of may.
	- Currency config is the only one config that is a trouble. We might leave it as it, or propose a change in decidim to move currency settings to system, like timezones
	- host change needs to be improved, to have an async task that check the DNS resolution before applying the change
	- SMTP as well needs to change, with a validation email set through new settings. In clicking on the confirmation link, the SMTPs get applied
	- S3 configurations needs to be somewhat similar to database configuration. We need then a middleware that change the storage strategy on the fly.

