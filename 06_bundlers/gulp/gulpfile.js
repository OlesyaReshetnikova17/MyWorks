 const { src, dest, series, watch} = require('gulp');
 const concat = require('gulp-concat')
  const htmlMin = require('gulp-htmlmin')
  const autoprefixes = require('gulp-autoprefixer')
  const cleanCSS = require('gulp-clean-css')
  const svgSprite = require('gulp-svg-sprite')
  const image = require('gulp-image')
  const babel = require('gulp-babel')
  const uglify = require('gulp-uglify-es').default
  const notify = require('gulp-notify')
  const sourcemaps = require('gulp-sourcemaps')
  const del = require('del')
  const argv = require('yargs').argv
  const mode = require('gulp-mode')
  const browserSync = require('browser-sync').create()
  
  const clean = () => {
    return del(['dist'])
  }
  const resourses = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
  }
 const styles = () => {
   return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
   .pipe(concat('main.css'))
   .pipe(autoprefixes({
    cascade: false
   }))
   .pipe(cleanCSS({
    level: 2
   }))
   .pipe(sourcemaps.write())
   .pipe(dest('dist'))
   .pipe(browserSync.stream())
 }

 const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
 }

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

 const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
 } 

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir:'dist'
    }
  })
}

const images = () => {
  return src([
		'src/images/**.jpg',
		'src/images/**.png',
		'src/images/**.jpeg',
		'src/images/*.svg',
		'src/images/**/*.jpg',
		'src/images/**/*.png',
		'src/images/**/*.jpeg'
		])
    .pipe(image())
    .pipe(dest('dist/images'))
}



watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css',styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resourses)

function building() {
  return src([
      'src/images/**/*.*',
      '!src/images/**/*.*',
      'src/**/*.html',
      '!src/**/*.dev.html',
      '!src/layouts/**/*.*',
      'src/css/**/*.css',
      'src/js/**/*.min.js',
  ], {base : 'src'})
      .pipe(dest('dist'))
}

 exports.styles = styles
 exports.scripts = scripts
 exports.building = building;
 exports.htmlMinify = htmlMinify

 exports.build = series(images, scripts,svgSprites, styles, building);
exports.default = parallel(styles, images, scripts, svgSprites, watchFiles);


 exports.default = series(clean, resourses, htmlMinify, )