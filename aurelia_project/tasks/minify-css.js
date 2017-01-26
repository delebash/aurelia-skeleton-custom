import gulp from 'gulp';
import cleanCSS  from 'gulp-clean-css';
import concat  from 'gulp-concat';
import project from '../aurelia.json';

export default function minifyCss() {
    return gulp.src(project.minifyCss.sources)
        .pipe(cleanCSS())
        .pipe(concat(project.minifyCss.filename))
        .pipe(gulp.dest(project.minifyCss.output));
}

