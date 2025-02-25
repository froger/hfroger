// download-image.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import downloadFileTo from './downloadFileTo.mjs';

/**
 * downloadImageTo
 * Downloads an image from fileUrl and saves it as a timestamp-based filename.
 *
 * @param {string} fileUrl - The remote URL of the image.
 * @param {string} outDir - Directory to save the downloaded image.
 * @returns {Promise<string>} - The newly created filename (e.g. "1677301234567.jpg").
 */
async function downloadImageTo(fileUrl,  outDir) {
  return downloadFileTo(fileUrl, outDir, ".jpg")
}
export default downloadImageTo
