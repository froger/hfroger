import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function downloadFileTo(fileUrl, outDir, defaultExt = '.txt') {
  try {
    // Derive extension from the remote URL
    const urlPath = new URL(fileUrl).pathname;
    let extension = path.extname(urlPath);
    if (!extension) extension = defaultExt;

    // Create a new file name with a timestamp
    const newFileName = `${Date.now()}${extension}`;
    const outPath = path.join('static', outDir, newFileName);

    console.log('[downloadFileTo] Derived file name:', newFileName);
    console.log('[downloadFileTo] Full path:', outPath);

    // Fetch the remote file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`[downloadFileTo] Failed to fetch remote file. HTTP status: ${response.status}`);
    }

    // Convert response to a Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write file to disk
    fs.writeFileSync(outPath, buffer);
    console.log('[downloadFileTo] File written successfully:', outPath);

    // Return useful info
    return `/${outDir}/${newFileName}`

  } catch (error) {
    console.error('[downloadFileTo] Error:', error.message);
    console.error(error); // log the full error stack
    throw error;          // re-throw to handle it further up if needed
  }
}

export default downloadFileTo;
