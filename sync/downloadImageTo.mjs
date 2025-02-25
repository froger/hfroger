// download-image.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

/**
 * downloadImageTo
 * Downloads an image from fileUrl and saves it as a timestamp-based filename.
 *
 * @param {string} fileUrl - The remote URL of the image.
 * @param {string} outDir - Directory to save the downloaded image.
 * @returns {Promise<string>} - The newly created filename (e.g. "1677301234567.jpg").
 */
async function downloadImageTo(fileUrl,  outDir) {
  try {
    // Ensure the output directory exists or create it
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Derive the extension from the remote URL (fallback to .jpg)
    const urlPath = new URL(fileUrl).pathname;
    let extension = path.extname(urlPath);
    if (!extension) extension = '.jpg';

    // Create a new file name with a timestamp
    const newFileName = `${Date.now()}${extension}`;
    const outPath = path.join(outDir, newFileName);

    // Fetch the image data
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    // Buffer the response and write it to disk
    const buffer = await response.buffer();
    fs.writeFileSync(outPath, buffer);

    // Return the new file name
    return newFileName;
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}
export default downloadImageTo
