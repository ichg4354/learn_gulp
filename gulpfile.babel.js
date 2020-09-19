import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import img from "gulp-image";
import scss from "gulp-sass";
import apref from "gulp-autoprefixer";
import csso from "gulp-csso";
import browserify from "gulp-bro";
import babelify from "babelify";
import gh from "gulp-gh-pages";

const paths = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  img: {
    watch: "src/img/*",
    src: "src/img/*",
    dest: "build/img",
  },
  styles: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/styles.scss",
    dest: "build/css",
  },
  js: {
    watch: "src/js/*",
    src: "src/js/main.js",
    dest: "build/js",
  },
};

const pug = () =>
  gulp.src(paths.pug.src).pipe(gPug()).pipe(gulp.dest(paths.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true }));

const image = () =>
  gulp.src(paths.img.src).pipe(img()).pipe(gulp.dest(paths.img.dest));

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(scss().on("error", scss.logError))
    .pipe(apref())
    .pipe(csso())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watch = () => {
  gulp.watch(paths.pug.watch, pug);
  gulp.watch(paths.img.watch, image);
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const ghPage = () => {
  gulp.src("build/**/*").pipe(gh());
};

const prepare = gulp.series([clean, image]);

const assets = gulp.series([pug, styles, js]);

const localServerDeploy = gulp.series([webserver, watch]);

const build = gulp.series([prepare, assets]);

export const dev = gulp.series([build, localServerDeploy]);
export const deploy = gulp.series([build, ghPage]);
