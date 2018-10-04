const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

//complie Sass

gulp.task("sass", function () {
    return gulp.src(["./app/sass/*.scss"]).pipe(sass()).pipe(autoprefixer({browsers: ["last 2 versions"], cascade: false})).on("error", function (errorInfo) {
        console.log(errorInfo.toString());
        this.emit("end");
    }).pipe(gulp.dest("./app/css")).pipe(browserSync.stream());
});

//watch & serve

gulp.task("watch", ["sass"], function () {
    browserSync.init({server: "./app", notify: false});

    //  . /app/sass/**/*.scss means all .scss files in subfolders
    gulp.watch(["./app/sass/*.scss"], ["sass"]);
    gulp.watch(["./app/*.html"]).on("change", browserSync.reload);
});

//default
// gulp.task("default", ["serve"]);