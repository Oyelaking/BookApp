/*
 * Controller for the authors page.
 */
(function () {
    var module = angular.module("bookApp.controller.authors", [
        "bookApp.service.author"
    ]);
    module.controller('authorsCtrl', ['$scope', 'authorService', authorsCtrl]);
    function authorsCtrl($scope, bookService) {
        alert("Hi from Authors controller");
    }
})();