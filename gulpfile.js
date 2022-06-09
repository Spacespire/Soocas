let { src, dest } = require("gulp");
let fs = require('fs');
let gulp = require("gulp");
let browsersync = require("browser-sync").create();
let autoprefixer = require("gulp-autoprefixer");
let scss = require('gulp-sass')(require('sass'));
let group_media = require("gulp-group-css-media-queries");
let del = require("del");
let uglify = require("gulp-uglify-es").default;
let rename = require("gulp-rename");
let fileinclude = require("gulp-file-include");
let clean_css = require("gulp-clean-css");
let pug = require('gulp-pug');


let project_name = "dist";
let src_folder = "#src";

let path = {
	build: {
		html: project_name + "/",
		js: project_name + "/js/",
		css: project_name + "/css/",
		images: project_name + "/img/",
		fonts: project_name + "/fonts/"
	},
	src: {
		favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		html: [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
		pug: [src_folder + "/*.pug", "!" + src_folder + "/_*.pug"],
		js: [src_folder + "/js/app.js", src_folder + "/js/vendors.js"],
		css: src_folder + "/scss/style.scss",
		images: [src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", "!**/favicon.*"],
		fonts: src_folder + "/fonts/*.ttf"
	},
	watch: {
		html: src_folder + "/**/**/*.html",
		pug: src_folder + "/**/**/*.pug",
		js: src_folder + "/**/**/**/*.js",
		css: src_folder + "/scss/**/*.scss",
		images: src_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		blockCss: src_folder + "/components/**/**/*.scss",
		blockJs: src_folder + "/components/**/**/*.js",
		blockHtml: src_folder + "/components/**/**/*.html",
	},
	clean: "./" + project_name + "/"
};
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./" + project_name + "/"
		},
		notify: false,
		port: 3000,
	});
}

function gulpPrepros() {
	return src(path.src.pug)
		.pipe(pug({
			doctype: 'html',
			pretty: true
		}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function html() {
	return src(path.src.html, {})
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}
function css() {
	return src(path.src.css, {})
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(browsersync.stream())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}
function js() {
	return src(path.src.js, {})
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.js))
		.pipe(uglify(/* options */))
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}


gulp.task('importImg', function () {
	return src(path.src.images)
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream())
})


function fontstyle() {
	let file_content = fs.readFileSync(src_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}
function cb() { }
function clean() {
	return del(path.clean);
}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.pug], gulpPrepros);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.blockCss], css);
	gulp.watch([path.watch.blockJs], js);
	gulp.watch([path.watch.blockHtml], html);
}
let build = gulp.series(gulp.parallel(html, css, js, gulpPrepros), gulp.parallel(fontstyle));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.gulpPrepros = gulpPrepros;
exports.css = css;
exports.js = js;
exports.fontstyle = fontstyle;
exports.build = build;
exports.watch = watch;
exports.default = watch;