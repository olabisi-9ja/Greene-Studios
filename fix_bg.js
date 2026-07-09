const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // We want to replace hardcoded bg classes on the min-h-screen wrapper div
  // The regex looks for: className="... min-h-screen ... bg-something ..."
  content = content.replace(/className=\"([^\"]*)min-h-screen([^\"]*)(bg-white|bg-\[\#FAFAFA\]|bg-\[\#0e0e0e\])([^\"]*)\"/g, 'className=\"$1min-h-screen$2 bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000$4\"');
  
  // Fix double spaces
  content = content.replace(/  +/g, ' ');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated: ' + file);
  }
});
