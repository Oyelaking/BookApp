/*
 * Author controller module
 *  
 */

(function () {

    var module = angular.module('bookApp.controller.author', [
        'bookApp.service.author'
    ]);

    module.controller('authorCtrl', ['$routeParams', 'authorService', authorCtrl]);

    function authorCtrl($routeParams, authorService) {

        var that = this;
        this.books = [];
        this.id = $routeParams.authorId;
        this.author = {};

        init();

        function init() {
            //get the author
            authorService.get(that.id).then(function (response) {
                that.author = response.data;
                authorService.getBooks(that.id).then(function (response) {
                    that.books = response.data;
                }, function (response) {
                    alert("Failed to load author books");
                });
            }, function (response) {
                alert("Failed to get author");
            });
        }
    }

})();