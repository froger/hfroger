import notionTable from "./notionTable.mjs";
import _ from 'lodash'

const linkTable = async (filter) => {
  const links = await notionTable(filter)
  const formattedLink = links.map((link) => {
    const label = (_.first(link.Title.title)?.plain_text || "").replaceAll("|", "/")
    const comment = _.first(link.Comment.rich_text)?.plain_text || ""
    const href = link.Link.url;
    const category = link.Category?.select?.name || ""

    if(_.isEmpty(label) || _.isEmpty(href)) return false;
    return `| [${label}](${href}) 	| ${category ? `\`#${category}\`` : ""} 	| [ ${href.substr(0,25)} ](${href}) 	| ${comment} 	|`
  }).filter(Boolean)

  return formattedLink.join("\n")
}

const syncLinks = async (pagePosition, title, paragraph, filter) => {
  return `---
sidebar_position: ${pagePosition}
hide_table_of_contents: true
last_update:
  date: ${(new Date()).toISOString()}
---

# ${title}
${paragraph}

| Title            	| Tags                 	| Link     	| Comment                     	|
|------------------	|----------------------	|----------	|-----------------------------	|
${await linkTable(filter)}

`
}

export default syncLinks;