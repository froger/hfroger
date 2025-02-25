import {Client} from "@notionhq/client"
import {NotionToMarkdown} from "notion-to-md";
import downloadImageTo from "./downloadImageTo.mjs";
import downloadFileTo from "./downloadFileTo.mjs";

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
  let srcUrl = "";
  let name = image.name || ""
  if(image.type === "external") {
    try{
      srcUrl = await downloadImageTo(image.external.url, "storage")
    }catch(err) {
      // fallback on download external image, it might allow embedding. 
      srcUrl = image.external.url
    }
  }else {
    const fileUrl = image.file.url;
    srcUrl = await downloadImageTo(fileUrl, "storage")
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
n2m.setCustomTransformer("file", async (block) => {
  const { file } = block;
  let srcUrl = "";
  if(file.type === "external") {
    try{
      srcUrl = await downloadFileTo(file.external.url, "storage")
    }catch(err) {
      // fallback on download external file, it might allow embedding. 
      srcUrl = file.external.url
    }
  }else {
    const fileUrl = file.file.url;
    srcUrl = await downloadFileTo(fileUrl, "storage")
  }
  console.log("SRC URL ", {srcUrl})
  return `<a href="${srcUrl}" target="_blank">Download File</a>`;
});

export default notionCli;