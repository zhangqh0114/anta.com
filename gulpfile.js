const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const sourcemaps = require("gulp-sourcemaps");

//搭建服务器环境
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    });
    done();
});

//拷贝html文件
gulp.task("html", done => {
    gulp.src('src/html/*.html')
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());//修改html后浏览器自动刷新
    done();
});

// 拷贝IMG文件
gulp.task("imgs",done=>{
    gulp.src('src/img/*.{jpg,png}')
    .pipe(gulp.dest('dist/img'));
    done();
});
//scss转css
gulp.task("sass", done => {
    gulp.src('src/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "nested" }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
    done();
});

//监听事件
gulp.task("watch", done => {
    gulp.watch('src/style/*.scss', gulp.series("sass"));
    gulp.watch('src/html/*.html', gulp.series("html"));
    done();
});

//默认任务
gulp.task("default", gulp.parallel("server", "watch","imgs"));