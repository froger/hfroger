import 'dotenv/config';
import syncLinks from "./sync-links.mjs";
import syncProjects from "./sync-projects.mjs";
import removeMdFiles from './removeMdFiles.mjs'
import fs from 'fs';
import syncNotes from './sync-notes.mjs';
import removeImageFiles from './removeImageFiles.mjs';

const sync = async () => {
  removeImageFiles("static/storage")
  removeMdFiles("docs/archive")
  removeMdFiles("docs/notes")
  removeMdFiles("docs/projects")
  const activeLinks = await syncLinks(3, "Fresh Links", "Links I currently use as reference in my daily routines. Theses links refers to external site, they may have changed or outdated.", "Resource");
  const archiveLinks = await syncLinks(6, "Archived Links", "Links I do not use anymore as reference.Theses links refers to external site, they may have changed or outdated.", "Archive");
  fs.writeFileSync("docs/links.md", activeLinks)
  fs.writeFileSync("docs/archive/links.md", archiveLinks)
  let paginationNumber
  paginationNumber = await syncProjects(15, "Projects");
  paginationNumber = await syncProjects(paginationNumber+1, "Archive", "docs/archive");
  paginationNumber = await syncNotes(paginationNumber+1)
}

console.log("Sync start")
sync().then(() => console.log("Sync is done"))