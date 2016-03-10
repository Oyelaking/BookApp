/* 
 * Bootstrap file for the js application.
 */

var sails = require('sails');

before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);

    sails.lift({
        // configuration for testing purposes
        log: {
            level: 'error'
        },
        models: {
            connection: 'localDiskDb',
            migrate: 'drop'
        }
    }, function (err, server) {
        if (err)
            return done(err);
        // here you can load fixtures, etc.
        done(err, sails);
    });
});

// the hook for populating the db
//we have to load the test data to use in testing
before(function (done) {
    var fs = require('fs');
    //load genres
    var genreModel = require('../api/models/Genre');
    fs.readFile('test/fixtures/genres.json', function (err, data) {
        if (err) {
            done(err);
        } else {
            var genresObjects = JSON.parse(data);
            console.log("genreObjects: " + JSON.stringify(genresObjects));
            console.log("genreModel: " + JSON.stringify(genreModel));
            for (var index in genresObjects)
                genreModel.create(genresObjects[index]).exec(done);
        }
    });
});

before(function (done) {
    var fs = require('fs');
    //load authors
    var authorModel = require('../api/models/Author');
    fs.readFile('test/fixtures/authors.json', function (err, data) {
        if (err) {
            done(err);
        } else {
            var authorsObjects = JSON.parse(data);
            console.log("authorsObjects: " + JSON.stringify(authorsObjects));
            for (var index in authorsObjects)
                authorModel.create(authorsObjects[index]).exec(done);
        }
    });
});

before(function (done) {
    var fs = require('fs');
    //load books
    var bookModel = require('../api/models/Book');

    fs.readFile('test/fixtures/books.json', function (err, data) {
        if (err) {
            done(err);
        } else {
            var bookObjects = JSON.parse(data);
            console.log("BookRecords: " + JSON.stringify(bookObjects));
            for (var index in bookObjects)
                bookModel.create(bookObjects[index]).exec(done);
        }
    });
});

after(function (done) {
    // here you can clear fixtures, etc.
    sails.lower(done);
});