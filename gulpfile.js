const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const htmlmin = require('gulp-htmlmin');
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
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());//修改html后浏览器自动刷新
    done();
});

// 拷贝IMG文件
gulp.task("imgs", done => {
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
//拷贝libs 外部插件文件
gulp.task("libs", done => {
    gulp.src('src/libs/*.js')
        .pipe(gulp.dest('dist/libs'))
        ;
    done();
});
//拷贝js文件
gulp.task("babel", done => {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(connect.reload());
    done();
});
//监听事件
gulp.task("watch", done => {
    gulp.watch('src/style/*.scss', gulp.series("sass"));
    gulp.watch('src/html/*.html', gulp.series("html"));
    gulp.watch('src/img/*.{jpg,png}', gulp.series("imgs"));
    gulp.watch('src/libs/*.js', gulp.series("libs"));
    gulp.watch('src/js/*.js', gulp.series("babel"));

    done();
});

//默认任务
gulp.task("default", gulp.parallel("server", "watch"));