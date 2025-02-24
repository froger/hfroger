import 'dotenv/config';
import syncArticles from "./sync-articles"
import syncLinks from "./sync-links";
import syncProjects from "./sync-projects";

const sync = async () => {
  await syncArticles();
  await syncLinks();
  await syncProjects();
}

export default sync;