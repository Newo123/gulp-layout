import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

// fileinclude({
//     context: {
//         arr: ['test1', 'test2']
//     }
// });

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Eror: <%= error.message %>"
            })
        ))
        .pipe(fileinclude({
            context: {
                arr: ['Главная', 'Маркетинг', 'Сервис', 'О нас', 'Контакты', 'Портфолио'],
                link: ['@@webRoot/index.html', '@@webRoot/krasnodar/marketing/marketing.html', '@@webRoot/krasnodar/service.html']
            }
        }))
        .pipe(app.plugins.replace(/@img\//g, './img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}