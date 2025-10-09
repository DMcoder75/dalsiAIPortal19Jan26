const fs = require('fs');
const path = require('path');

const products = [
  'writerPro', 'codeGenius', 'businessSuite', 'researcher', 'chatbotBuilder',
  'visionScan', 'medVision', 'artStudio', 'inspector', 'brandGuard',
  'movieMaker', 'translateGlobal', 'musicStudio', 'videoAds', 'learningPlatform'
];

const template = (productVar, componentName) => `import ProductPageTemplate from './ProductPageTemplate'
import { ${productVar}Data } from '../../data/productsData'

export default function ${componentName}() {
  return <ProductPageTemplate productData={${productVar}Data} />
}
`;

const outputDir = path.join(__dirname, 'src', 'components', 'products');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate each product page
products.forEach(productVar => {
  const componentName = productVar.charAt(0).toUpperCase() + productVar.slice(1) + 'Page';
  const fileName = componentName + '.jsx';
  const filePath = path.join(outputDir, fileName);
  
  fs.writeFileSync(filePath, template(productVar, componentName));
  console.log(`✅ Created ${fileName}`);
});

console.log(`\n🎉 Successfully generated ${products.length} product pages!`);
