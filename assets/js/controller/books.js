/**
 * Module for the books controller.
 * 
 * @type angular.module.angular-1_3_6_L1749.moduleInstance
 */

(function () {
    var module = angular.module("bookApp.controller.books", [
        "bookApp.service.book"
    ]);

    module.controller('booksCtrl', ['$scope', 'bookService', 'bootstrapHelper', booksCtrl]);

    function booksCtrl($scope, bookService, bootstrapHelper) {

        var that = this;
        
        this.books = [];
        this.pageTitle = "View all Books";

        init();

        function init() {
            bookService.list().then(function (response) {//success callback
                that.books = response.data;
            }, function (response) {//error callback
                var message = "An error occured while initializing. Server message: " + response.statustext;
                bootstrapHelper.addAlert(message);
            });
        }
    }
})();