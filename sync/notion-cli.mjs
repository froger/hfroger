import {Client} from "@notionhq/client"
import {NotionToMarkdown} from "notion-to-md";
import downloadImageTo from "./downloadImageTo.mjs";

const notionCli = new Client({
  auth: process.env.NOTION_TOKEN
})
export const n2m = new NotionToMarkdown({ 
  notionClient: notionCli,
    config:{
     separateChildPage:true, // default: false
  }
 });

 n2m.setCustomTransformer("embed", async (block) => {
  const { embed } = block;
  if (!embed?.url) return "";
  return `<figure>
  <iframe src="${embed?.url}"></iframe>
  <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
</figure>`;
});

n2m.setCustomTransformer("image", async (block) => {
  const { image } = block;
  console.log("IMAGE", image)
  let srcUrl = "";
  let name = image.name || ""
  if(image.type === "external") {
    try{
      srcUrl = await downloadImageTo(image.external.url, "static/storage/")
    }catch(err) {
      // fallback on download external image, it might allow embedding. 
      srcUrl = image.external.url
    }
  }else {
    const fileUrl = image.file.url;
    srcUrl = await downloadImageTo(fileUrl, "static/storage/")
  }
  return `
<figure>
  <img src="${srcUrl}" alt="${name}" />
  <figcaption>
  
    ${await n2m.blockToMarkdown(image?.caption)}
  
  </figcaption>
</figure>

`;
});

export default notionCli;