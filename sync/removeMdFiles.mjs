import fs from 'fs';
import path from 'path';

/**
 * removeMdFiles
 * Removes all .md files from the specified directory.
 *
 * @param {string} directoryPath - The path of the directory to clean.
 */
function removeMdFiles(directoryPath) {
    if(!fs.existsSync(directoryPath)) return;
  
  // Read all files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    // Loop through each file
    files.forEach((file) => {
      // Check if the file extension is .md
      if (path.extname(file) === '.md') {
        // Remove the file
        fs.unlink(path.join(directoryPath, file), (err) => {
          if (err) throw err;
        });
      }
    });
  });
}

export default removeMdFiles