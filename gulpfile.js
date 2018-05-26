var gulp = require('gulp');
var webserver = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var less = require('gulp-less');
var sequence = require('gulp-sequence');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var miniHtml = require('gulp-htmlmin');
var babel = require('gulp-babel');
var url = require('url');
var fs = require('fs');
var mock = require("./src/data/mock");
var user = {
    name: "zs",
    pwd: 1234
};

//压缩html
gulp.task('miniH1', function() {
    return gulp.src('./src/page/*.html')
        .pipe(miniHtml({
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('dist/page'))
});
gulp.task('miniH2', function() {
    return gulp.src('./src/index.html')
        .pipe(miniHtml({
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('dist'))
});

var userCheck = false;

//压缩js
gulp.task('uglify', function() {
    return gulp.src(['src/js/{common/,lib/,/page/}*.js', 'src/js/main.js'])
        .pipe(babel({
            presets: 'es2015' //指定编译后的版本为es5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//压缩cssy
gulp.task('testless', function() {
    return gulp.src('src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'))
});

//起服务
gulp.task('webserver', function() {
    return gulp.src('dist')
        .pipe(webserver({
            port: 8880,
            host: 'localhost',
            livereload: true,
            middleware: function(req, res, next) {
                // var data = fs.readFileSync('src/data/home.json').toString()
                var pathname = url.parse(req.url, true).pathname;
                var arr = [];

                //用户登录
                if (req.url === '/loginUser') {
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data);

                        if (obj.user == user.name && obj.pwd == user.pwd) {
                            userCheck = true;
                            res.end('0');
                        } else {
                            res.end('1');
                        }
                    })
                    return false;
                }

                //返回是否登陆结果
                if (req.url === '/loginSearch') {
                    res.end('{"result":"' + userCheck + '"}');
                }

                //返回数据
                if (pathname.indexOf('/book') !== -1) {
                    res.end(JSON.stringify(mock(req.url)));
                }

                next();
            }

        }))
});
gulp.task('default', function(cb) {

    sequence('testless', 'miniH1', 'miniH2', 'uglify', 'webserver', cb)
})