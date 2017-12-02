var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

//NOTE: Gulp needs to be installed globally for it to work through the CMD
gulp.task('default', function () {
    nodemon({
        script: 'app.js', //script nodemon runs
        ext: 'js', //watch js extension files
        env: {
            PORT: 8000
        },
        ignore: ['/node_modules/**']

    })
        //below enables the node server to restart on any saved code change involving a js file
        .on('restart', function () {
            console.log('Restarting from nodemon');
        });

});