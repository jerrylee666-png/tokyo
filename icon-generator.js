// icon-generator.js
// 檢查或自動生成 PWA 應用程式圖示 (icon-192.png, icon-512.png)
const fs = require('fs');
const path = require('path');

const icons = ['icon-192.png', 'icon-512.png'];
icons.forEach((icon) => {
  const iconPath = path.join(__dirname, icon);
  if (fs.existsSync(iconPath)) {
    const stat = fs.statSync(iconPath);
    console.log(`✓ ${icon} 已就緒 (${stat.size} bytes)`);
  } else {
    console.warn(`! 缺少 ${icon}`);
  }
});
