//压缩图片
var gulp = require('gulp');//获取gulp
const imagemin = require('gulp-imagemin');//获取gulp-imagemin模块
 
gulp.task('images', () => {
    gulp.src('src/images/*.jpg')//压缩图片
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))//另存图片
}

);

gulp.task('default', ['images', 'auto'])


gulp.task('auto',function() {
    gulp.watch('images/*.jpg',['images'])
})


//浏览器自动刷新
var browserSync = require('browser-sync').create();

var config = {
  baseDir: 'gulp',
  watchFiles: [ 'gulp/src/html/rest.html', 'gulp/src/less/rest.css' ]
}

gulp.task('server', function() {
  browserSync.init({
    //files: config.watchFiles,
    port: 3306,
    server: {
      baseDir: 'dist'
    }
  });
})
gulp.task('default',['server']); //定义默认任务





//less and sass
//获取 gulp-less 模块
var less = require('gulp-less')

// 编译less
// 在命令行输入 gulp images 启动此任务
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src('src/less/**.less')
    // 2. 编译为css
        .pipe(less())
    // 3. 另存文件
        .pipe(gulp.dest('dist/css'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('less/**.less', ['less'])
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 less 任务和 auto 任务
gulp.task('default', ['less', 'auto'])



var sass = require('gulp-ruby-sass')

// 编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function() {
    return sass('sass/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('dist/css'))
});

gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    gulp.watch('sass/**/*.scss', ['sass'])
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 sass 任务和 auto 任务
gulp.task('default', ['sass', 'auto'])
