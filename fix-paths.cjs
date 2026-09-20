const fs = require('fs');
function replacePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/"\/videos\//g, '"./videos/');
  content = content.replace(/'\/videos\//g, "'./videos/");
  content = content.replace(/"\/gallery\//g, '"./gallery/');
  content = content.replace(/'\/gallery\//g, "'./gallery/");
  content = content.replace(/"\/members\//g, '"./members/');
  content = content.replace(/'\/members\//g, "'./members/");
  content = content.replace(/"\/hero-bg\.jpeg"/g, '"./hero-bg.jpeg"');
  content = content.replace(/'\/hero-bg\.jpeg'/g, "'./hero-bg.jpeg'");
  fs.writeFileSync(filePath, content);
}
replacePaths('src/data.js');
replacePaths('src/components/Hero.jsx');
replacePaths('src/components/Highlights.jsx');
