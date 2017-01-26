import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyCss from './copy-css';
import copyFiles from './copy-files';
import minifyCss from './minify-css';
import dist from './dist';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

copyFiles();

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    copyCss,
    processCSS
  ),
  gulp.parallel(
    transpile,
    processMarkup
  ),
  writeBundles,
  dist
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
