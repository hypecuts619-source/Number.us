const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
  if (['Home.tsx', 'WireTransferGuide.tsx', 'InternationalWireGuide.tsx'].includes(file)) continue;

  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const adstr = '      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">\n        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="' + file.replace('.tsx', '').toLowerCase() + '-hero" />\n      </div>\n';

  if (!content.includes(adstr.trim())) {
      // maybe the spacing is different
      const match = content.match(/<div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">\s*<AdsterraNativeSlot [^>]+>\s*<\/div>/);
      if (match) {
          const matchedStr = match[0];
          content = content.replace(matchedStr, '');
          // Remove leftover empty lines if possible
          content = content.replace(/\n\n\n/g, '\n\n');
          
          // Find standard hero end. 
          // Usually ends before <div className="prose or similar
          // Let's use a heuristic: The first <div className="prose or <div className="grid or <div className="flex AFTER the h1
          
          const h1Index = content.indexOf('</h1>');
          if (h1Index !== -1) {
              const proseIndex = content.indexOf('<div className="prose', h1Index);
              const gridIndex = content.indexOf('<div className="grid', h1Index);
              const flexColsIndex = content.indexOf('<div className="flex flex-col', h1Index);
              const bgWhiteIndex = content.indexOf('<div className="bg-white', h1Index);
              
              const candidates = [proseIndex, gridIndex, flexColsIndex, bgWhiteIndex].filter(i => i !== -1);
              let insertTarget = -1;
               if (candidates.length > 0) {
                  insertTarget = Math.min(...candidates);
               } else {
                  // as a fallback just put it right before the first closing </div> tag that is at least 100 chars after h1
                  let nextDiv = content.indexOf('</div>', h1Index + 100);
                  if (nextDiv !== -1) {
                      insertTarget = nextDiv + 6;
                  }
               }
               
               if (insertTarget !== -1) {
                   content = content.substring(0, insertTarget) + matchedStr + '\n\n' + content.substring(insertTarget);
               } else {
                   // append at bottom if really can't find it (unlikely)
                   content += '\n' + matchedStr;
               }

          }
          fs.writeFileSync(filePath, content);
          modifiedCount++;
      }
  } else {
       // Using simpler string replace
        content = content.replace(adstr, '');
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        const h1Index = content.indexOf('</h1>');
        if (h1Index !== -1) {
            const proseIndex = content.indexOf('<div className="prose', h1Index);
            const gridIndex = content.indexOf('<div className="grid', h1Index);
            const flexColsIndex = content.indexOf('<div className="flex flex-col', h1Index);
            const bgWhiteIndex = content.indexOf('<div className="bg-white', h1Index);
            const contentDivIndex = content.indexOf('<div className="content', h1Index);
            
            const candidates = [proseIndex, gridIndex, flexColsIndex, bgWhiteIndex, contentDivIndex].filter(i => i !== -1);
            let insertTarget = -1;
             if (candidates.length > 0) {
                insertTarget = Math.min(...candidates);
             } else {
                 // Try looking for <div className="space-y
                 const spaceYIndex = content.indexOf('<div className="space-y', h1Index);
                 if (spaceYIndex !== -1) {
                     insertTarget = spaceYIndex;
                 } else {
                     let nextDiv = content.indexOf('</div>', h1Index);
                     // the first </div> closes the h1 wrapper maybe?
                     const secondDiv = content.indexOf('</div>', nextDiv + 6);
                     insertTarget = secondDiv !== -1 ? secondDiv + 6 : nextDiv + 6;
                 }
             }
             
             if (insertTarget !== -1) {
                 content = content.substring(0, insertTarget) + adstr + '\n' + content.substring(insertTarget);
             } else {
                 content = content + '\n' + adstr;
             }
        }
        fs.writeFileSync(filePath, content);
        modifiedCount++;
  }
}
console.log('Moved ads for:', modifiedCount, 'files');
