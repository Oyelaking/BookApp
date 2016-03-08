/**
 * Main app controller.
 */

var appModule = angular.module('bookApp', [
    'ui.bootstrap',
    'ngRoute',
    'bookApp.controller.books',
    'bookApp.controller.book',
    'bookApp.controller.authors',
    'bookApp.controller.author',
    'bookApp.controller.genres',
    'bookApp.controller.genre',
    'bookApp.service.util'
]);

//configure the http service
appModule.config(['$httpProvider', function ($httpProvider) {
        //set the http provider to use X-Requested-With header
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        //also set the content type for post requests to x-www-form-urlencoded
        $httpProvider.defaults.headers.post["Content-Type"] = "text/json";
    }]);

//configure the routes
appModule.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/books', {
            templateUrl: '/templates/books.html',
            controller: 'booksCtrl as booksModel'
        }).when('/book/:bookId', {
            templateUrl: '/templates/book.html',
            controller: 'bookCtrl as bookModel'
        }).when('/author/:authorId', {
            templateUrl: '/templates/author.html',
            controller: 'authorCtrl as authorModel'
        }).when('/genre/:genreId', {
            templateUrl: '/templates/genre.html',
            controller: 'genreCtrl as genreModel'
        }).when('/authors', {
            templateUrl: '/templates/books.html',
            controller: 'authorsCtrl as authorsModel'
        }).when('/genres', {
            templateUrl: '/templates/genres.html',
            controller: 'genresCtrl as genresModel'
        }).when('/', {
            templateUrl: '/templates/home.html',
            controller: 'appCtrl as appModel'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

appModule.controller('appCtrl', ['$scope', appController]);

function appController() {
    alert("Hi form AppController");
}