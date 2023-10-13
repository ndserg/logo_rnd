import svgSpriter from 'gulp-svg-sprite';

const svgSprite = () => (
  app.gulp.src(app.path.src.svgicons)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG-Sprite',
        message: 'Error: <%= error.message %>',
      }),
    ))
    .pipe(svgSpriter({
      transform: ['svgo'],
      mode: {
        stack: {
          sprite: 'sprite.svg',
          example: !app.isBuild,
          dest: `./icons/`,
        },
      },
    }))
    .pipe(app.gulp.dest(app.path.build.images))
);

export default svgSprite;
