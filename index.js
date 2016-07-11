var path = require('path');
var fs = require('fs');
var router = require('koa-router')();

function walk(dir) {
    dir = path.resolve(__dirname, dir);
    var files = fs.readdirSync(dir);
    var list = [];
    for (var file of files) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            list = list.concat(walk(dir + '/' + file));
        } else {
            list.push(dir + '/' + file);
        }
    }
    return list;
}

module.exports = function (app, options) {
    if (!options || typeof options.root === 'string') {
        if (!path.isAbsolute(options.root)) {
            options.root = path.join(process.cwd(), options.root);
        }
    } else {
        throw Error('root must be specified');
    }
    options.suffix = options.suffix || '.js';
    options.action = options.action || 'index';
    options.prefix = options.prefix || '';

    var paths = walk(options.root);
    paths.forEach(function (value, index) {
        var _path = path.relative(options.root, value);
        _path = _path.slice(0, _path.length - options.suffix.length);

        router.use(options.prefix + '/' + _path, require(value).routes());
    });

    app.use(router.routes());

    return function* koaResource(next) {
        yield* next;
    };
};