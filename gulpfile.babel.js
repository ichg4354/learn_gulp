import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const paths = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () =>
  gulp.src(paths.pug.src).pipe(gPug()).pipe(gulp.dest(paths.pug.dest));

const clean = () => del(["build"]);

const webserver = () => gulp.src("build").pipe(ws({ livereload: true }));

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const preBuild = gulp.series([webserver]);

export const dev = gulp.series([prepare, assets, preBuild]);
