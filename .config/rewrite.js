/**
 * Builds simple rewrites
 * NOTE: Does not support catchAll or
 * optional catchAll routes.
 */
const glob = require('globby').sync;
const { join, relative } = require('path');

const CWD = process.cwd();
const ROOT_PATH = join(CWD, 'pages');
const HOME_PATH = 'public/home';

// All paths are relative from "pages" directory.
// [source/path, strip/path] - source path and the path to strip.
// [sourcePath] - used for both the source and strip.
const MAPPED_PATHS = [
  ['./public', 'public']
];

let rewrites = [];

const hasRoutes = (obj) => {
  return rewrites.find(v => (v.source === obj.source && v.destination === obj.destination))
};

const parseSegment = (seg) => {
  ;
  const source = seg;
  const isCatchAllOptional = /^\[\[/.test(seg);
  const isCatchAll = seg.includes('[...') && !isCatchAllOptional;
  const isDynamic = seg.includes('[') && !isCatchAll;
  seg = !isDynamic ? '' : seg;
  const text = seg.replace(/\[(\.{3})?|\]/g, '');
  const param = isCatchAll ? ':' + text + '*' : ':' + text;
  return {
    source,
    isDynamic,
    isCatchAllOptional,
    isCatchAll,
    text,
    param
  };
}

console.log('\n-- start rewrites --')

for (args of MAPPED_PATHS) {

  let [from, to] = !Array.isArray(args) ? [args] : args;
  from = from.replace(/^\.?\/?/, '');
  to = to.replace(/^\.?\/?/, '');
  const basePath = join(ROOT_PATH, from);

  glob(basePath, { onlyFiles: true }).forEach(v => {

    const destination = relative(ROOT_PATH, v.slice(0, v.lastIndexOf('.')));
    const source = relative(join(ROOT_PATH, to), join(ROOT_PATH, destination));
    const isHome = HOME_PATH === destination;

    const destSplit = destination.split('/');
    const parsed = parseSegment(destSplit[destSplit.length - 1]);

    // TODO: support dynamic params.
    if (parsed.isDynamic)
      return;

    const destArr = destSplit.slice(0, -1);
    const srcArr = source.split('/').slice(0, -1);

    destArr.push(':path');
    srcArr.push(':path');

    const paramRoutes = {
      source: '/' + srcArr.join('/'),
      destination: '/' + destArr.join('/')
    };

    const vanityRoutes = {
      source: '/' + source,
      destination: '/' + destination
    };

    if (isHome)
      vanityRoutes.source = '/';

    // Creates param rewrite ex: /path/:param
    // which will map to ex: /:param
    if (!hasRoutes(paramRoutes)) {
      rewrites.push(paramRoutes);
      console.log(paramRoutes.source, '-->', paramRoutes.destination);
    }

    // Creates actual and vanity ex: /path
    // which will map to the actual ex: /actual/path
    if (!hasRoutes(vanityRoutes)) {
      rewrites.push(vanityRoutes);
      console.log(vanityRoutes.source, '-->', vanityRoutes.destination);
    }
    else { // if we get a dupe vanity we need to know about that.
      console.warn(`Duplicate vanity routes detected:`, vanityRoutes);
    }

  });

};

console.log('-- end rewrites --\n');

module.exports = rewrites;