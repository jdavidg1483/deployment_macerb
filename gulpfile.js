import { src, dest, watch, series, parallel } from 'gulp';

// CSS y SASS
import sassLib from 'sass'; // Importar el compilador Sass
import gulpSass from 'gulp-sass'; // Importar gulp-sass

const sass = gulpSass(sassLib); // Pasar el compilador a gulp-sass

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

// Imágenes
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';

function css() {
  // Compilar SASS
  return src('src/scss/app.scss') // Fuente de archivos Sass
    .pipe(sass().on('error', sass.logError)) // Compilar Sass y manejar errores
    .pipe(postcss([autoprefixer()])) // Usar autoprefixer para compatibilidad con navegadores
    .pipe(dest('build/css/')); // Destino para los archivos CSS compilados
}

function imagenes() {
  // Optimizar imágenes
  return src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3 })) // Optimización de imágenes
    .pipe(dest('build/img')); // Guardar las imágenes optimizadas
}

function imagenWebp() {
  // Convertir imágenes a WebP
  return src('src/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 50 })) // Definir la calidad de las imágenes WebP
    .pipe(dest('build/img/webp')); // Guardar las imágenes WebP
}

function dev() {
  // Reloj para cambios en los archivos
  watch('src/scss/**/*.scss', css);
  // watch('src/img/**/*', series(imagenes, imagenWebp));  //  // Ejecutar ambas tareas cuando haya cambios en imágenes
}

export { dev, css, imagenWebp };

export default series(dev, css, imagenWebp);


// export { css, dev, imagenes, imagenWebp };

// export default series(imagenes, css, dev, imagenWebp);

