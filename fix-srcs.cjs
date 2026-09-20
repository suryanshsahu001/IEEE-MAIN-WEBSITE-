const fs = require('fs');
const path = require('path');
function fixFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content.replace(/src=["'](\/[^"']+)["']/g, 'src=".$1"');
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Fixed', fullPath);
      }
    }
  }
}
fixFiles('./src');
