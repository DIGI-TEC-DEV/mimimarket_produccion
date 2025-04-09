
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
      "path": "chunk-LZDCHMSN.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 2937, hash: 'e54337f7ae26c07e4507da95e28ccda8b6c63dc64903d422dbf46352bbe1100e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1750, hash: 'e1a77662f1055b018ecdd76277144fdb767e6ad2a3c7aec71390b4429d6328e0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-JHIUW2Q4.css': {size: 59073, hash: 'mWOSX9eJbds', text: () => import('./assets-chunks/styles-JHIUW2Q4_css.mjs').then(m => m.default)}
  },
};
