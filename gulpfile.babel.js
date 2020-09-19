import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import img from "gulp-image";

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
};

const pug = () =>
  gulp.src(paths.pug.src).pipe(gPug()).pipe(gulp.dest(paths.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true }));

const watch = () => {
  gulp.watch(paths.pug.watch, pug);
  gulp.watch(paths.img.watch, image);
};

const image = () =>
  gulp.src(paths.img.src).pipe(img()).pipe(gulp.dest(paths.img.dest));

const prepare = gulp.series([clean, image]);

const assets = gulp.series([pug]);

const preBuild = gulp.series([watch]);

export const dev = gulp.series([prepare, assets, preBuild]);
