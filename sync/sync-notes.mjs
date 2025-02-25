import slugify from "slugify";
import { n2m } from "./notion-cli.mjs";
import _ from "lodash";
import notionNotes from "./notionNotes.mjs";
import fs from 'fs'
const syncNotes = async (startIndex = 50) => {
  const notes = await notionNotes();
  const pageNumbers = await Promise.all(
    notes.map(async (note, index) => {
      const pageTitle = _.first(note.Title.title)?.plain_text || "";
      const slug = slugify(pageTitle, {
        lower: true,
        strict: true,
        trim: true,
        locale: "en",
      });
      const pageNumber = startIndex + index;
      const mdblocks = await n2m.pageToMarkdown(note.id);
      const mdString = n2m.toMarkdownString(mdblocks);
      const updatedAt = note['Last edited time']?.last_edited_time
      const pageContent = `---
sidebar_position: ${pageNumber}
slug: ${slug}
last_update:
  date: ${updatedAt}
hide_table_of_contents: true
---

# ${pageTitle}

${mdString.parent}

      `;

      fs.writeFileSync(`docs/notes/${slug}.md`, pageContent);
      return pageNumber;
    })
  );
  return startIndex + notes.length;
};

export default syncNotes;
