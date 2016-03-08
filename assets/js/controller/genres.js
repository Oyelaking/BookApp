/*
 * Controller for the genres page.
 */
(function () {
    var module = angular.module("bookApp.controller.genres", [
        "bookApp.service.genre"
    ]);

    module.controller('genresCtrl', ['$scope', 'authorService', genresCtrl]);

    function genresCtrl($scope, bookService) {
        alert("Hi from Genres controller");
    }
})();