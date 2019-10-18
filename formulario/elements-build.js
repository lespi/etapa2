const concat = require('concat');

(async function build() {
  const files = [
    './dist/formulario/runtime.js',
    './dist/formulario/polyfills.js',
    './dist/formulario/scripts.js',
    './dist/formulario/main.js'
  ];
  await concat(files, './dist/formulario/bundle.js');
})();
