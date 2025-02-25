import slugify from "slugify";
import notionCli, {n2m} from "./notion-cli.mjs";
import notionTable from "./notionTable.mjs";
import _ from 'lodash'
import fs from 'fs'

const syncProjects = async (startIndex=50, filter="Projects", outDir="docs/projects") => {
  const projectReferences = await notionTable(filter)

  await Promise.all(projectReferences.map(async (project, index) => {
    const href = project.Link.url;
    if(href) return false; // that's a link
    const pageTitle = (_.first(project.Title.title)?.plain_text || "");
    const slug = slugify(pageTitle, {lower: true, strict: true, trim: true, locale: "en"})
    const pageNumber = startIndex + index;
    const updatedAt = project['Updated At']?.last_edited_time

    const mdblocks = await n2m.pageToMarkdown(project.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    const fileContent = `---
sidebar_position: ${pageNumber}
slug: ${slug}
last_update:
  date: ${updatedAt}
hide_table_of_contents: true
---

# ${pageTitle}
${mdString.parent}
`
    fs.writeFileSync(`${outDir}/${slug}.md`, fileContent)
    return pageNumber;
  }))
  return startIndex + projectReferences.length;
}
export default syncProjects;