---
sidebar_position: 60
slug: override-decidim-views-from-a-module
last_update:
  date: 2025-04-03T17:19:00.000Z
hide_table_of_contents: true
---

# Override Decidim views from a module


Overriding views in Decidim can be tricky, and there are some pitfalls in all solutions. I will describe here my preferred solution, to be able to share a condensed information to new decidim-modules developers. 


## Prerequisite

- Create  a decidim module through the decidim generator
`decidim --component my-new-module`
- Add to the `.gemspec` the dependancies `deface`, to the latest stable version (see Rubygem: [https://rubygems.org/gems/deface](https://rubygems.org/gems/deface)).
- Have a test application `bundle exec rake test_app` should create one in `spec/decidim_dummy_app`

## Welcome `deface` !


[https://github.com/spree/deface](https://github.com/spree/deface) gem is a great gem that uses nokogiri HTML parser to parse `.erb.html` views. With this smart approach, you can target a view to override, and replace, surround, insert before almost anything. 


### Read the deface doc, again


Please be sure to ready few time deface docs. It will save you a lot of time to know well this gem.


### Use ruby files


I know, you can use `.deface` files, with fancy `<!--- deface commands -->` . It is nice but: 

1. You override view files for a purpose (improve admin experience), it makes sense to group all the overrides in one file. When maintaining, You will be able to check the stories and if something is wrong, you know where to look easier.
2. Settings up attributes (like adding CSS classes) is much more nicer in ruby than in a `.deface` file.
3. It’s faster to test your overrides work, as you just copy/past the `virtual_path` in your get_result command.

## Be sure your overrides works


From your development_app or `decidim_dummy_app` add the `deface` gem in your gemfile. After doing a `bundle exec rails --tasks | grep deface` you will see some very usefull command. My favorite is `deface:get_result[virtual_path]`. 


For example, here an override: [https://git.octree.ch/decidim/vocacity/decidim-modules/decidim-module-better-accountability/-/blob/main/app/overrides/surround_results.rb?ref_type=heads](https://git.octree.ch/decidim/vocacity/decidim-modules/decidim-module-better-accountability/-/blob/main/app/overrides/surround_results.rb?ref_type=heads)


```ruby
Deface::Override.new(
  virtual_path: "decidim/accountability/results/_project",
  name: "better_accountability_back_link",
  replace: "erb[loud]:contains('layouts/decidim/shared/layout_item')",
  text: "<%= render layout: 'layouts/decidim/better_accountability/layout_item' do %>"
)
```


`bundle exec rails deface:get_result[decidim/accountability/results/_project]`


will give you a nice diff on the file, to know exactly what you are doing. 


## Get inspired


Here some inspirations for your deface works: 

- Replace the template of a view, to be able to display two alternates views. (gem decidim-better-accountability will propose the results in original way, or in a grid): [https://git.octree.ch/decidim/vocacity/decidim-modules/decidim-module-better-accountability](https://git.octree.ch/decidim/vocacity/decidim-modules/decidim-module-better-accountability)
- Decidim awesome insert a javascript tag in the admin side: [https://github.com/decidim-ice/decidim-module-decidim_awesome/blob/main/app/overrides/layouts/decidim/_head/add_awesome_tags.html.erb.deface](https://github.com/decidim-ice/decidim-module-decidim_awesome/blob/main/app/overrides/layouts/decidim/_head/add_awesome_tags.html.erb.deface)

# Deface secrets


As always, you have a few undocumented things around that is great to know: 


### Careful: `.js.erb`bites!


Decidim, as most of rails application, will use unobstrutive javascript behaviour to refresh some ruby partials after an action. A common example is the decidim search in projects, that have an `index.js.erb` and a `index.html.erb`:

- [https://github.com/decidim/decidim/blob/develop/decidim-proposals/app/views/decidim/proposals/proposals/index.html.erb](https://github.com/decidim/decidim/blob/develop/decidim-proposals/app/views/decidim/proposals/proposals/index.html.erb)
- [https://github.com/decidim/decidim/blob/develop/decidim-proposals/app/views/decidim/proposals/proposals/index.js.erb](https://github.com/decidim/decidim/blob/develop/decidim-proposals/app/views/decidim/proposals/proposals/index.js.erb)

The important point here, is the `.js` format is solved in a **relative** path to the `.html` erb files. So in case you override the `decidim/proposals/proposals/index.html.erb`, deface will compile only this view in `app/compiled_view/decidim/proposals/proposals/index.html.erb`, and the javascript won’t be found anymore. 


> 💡 Avoid as much as possible to target `edit.html.erb` , `index.html.erb`, `show.html.erb` or check before targetting no javascript is present. 


### CSS selectors


Nokogiri supports most of the W3C CSS Selectors, [https://www.w3.org/TR/selectors-4/#grouping](https://www.w3.org/TR/selectors-4/#grouping) . So you can do crazy things! For example if you want to target the div section that has a h2.head


```html
<div class="section">
	<h2 class="header">HEADER</h2>
</div>
<div class="section">
	<h2 class="newsletter">NEWS</h2>
</div>
```


And in an `app/overrides/remove_newsletter.rb`


```javascript
Deface::Override.new(  
  virtual_path: "my_view",                         
  name: "no_newsletter",                         
	remove: ".section:has(.newsletter)"
)
```


Has `deface` tricks nokogiri to consider `<%=` as `ertb[loud]` tags, and `<%` as `erb[]slient]` tag, you can even do crazier rules like: `.section:has(erb[loud]:contains('newsletter_path'))` !


## Go in production

1. Add to your entrypoints or your application build a `bundle exec rails deface:precompile`
	1. The precompilation will add a `app/compiled_views/<your overrides>` files, and `compiled_views` path will be prepend over `app/views` path to be sure your overrides get loaded over the orginal files.
2. Add a configuration in your `config/environments/production.rb` to disable deface in production, as once compiled, it’s just pure Ruby!
	1. Something like: 
	`config.deface.enabled = ENV:fetch("DEFACE_ENABLED", "0") == "1"`


      