
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/html2canvas/dist/html2canvas.js": [
    {
      "path": "chunk-SOQBCYLK.js",
      "dynamicImport": false
    }
  ],
  "node_modules/dompurify/dist/purify.js": [
    {
      "path": "chunk-W2RNZCP2.js",
      "dynamicImport": false
    }
  ],
  "node_modules/canvg/lib/index.es.js": [
    {
      "path": "chunk-RFAFOZDX.js",
      "dynamicImport": false
    }
  ],
  "node_modules/flowbite/lib/esm/index.js": [
    {
      "path": "chunk-UG35GNGB.js",
      "dynamicImport": false
    }
  ],
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-O5KSEFBV.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 2937, hash: '0917b74c1ffd947fe73f88de6e12282332febff623c39f8afed99173ad5dc5f7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1750, hash: 'cc9cde2f5db03036be968c7541c5079a785804984dfee7d664c84a6db9fe0fe3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JHIUW2Q4.css': {size: 59073, hash: 'mWOSX9eJbds', text: () => import('./assets-chunks/styles-JHIUW2Q4_css.mjs').then(m => m.default)}
  },
};
