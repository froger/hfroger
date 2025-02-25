import fs from 'fs';
import path from 'path';

/**
 * removeImageFiles
 * Removes all images files from the specified directory.
 *
 * @param {string} directoryPath - The path of the directory to clean.
 */
function removeImageFiles(directoryPath) {
  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    // Loop through each file
    files.forEach((file) => {
      // Check if the file extension is .md
      if ([
        '.jpeg',
        '.jpg',
        '.png',
        '.svg'
      ].includes(path.extname(file))) {
        // Remove the file
        fs.unlink(path.join(directoryPath, file), (err) => {
          if (err) throw err;
        });
      }
    });
  });
}

export default removeImageFiles