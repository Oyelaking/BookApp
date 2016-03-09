/*
 * Book controller module
 */

(function () {

    var module = angular.module('bookApp.controller.book', [
        'bookApp.service.book'
    ]);

    module.controller('bookCtrl', ['$routeParams', 'bookService', 'bootstrapHelper',
        '$location', 'authorService', bookCtrl]);

    function bookCtrl($routeParams, bookService, bootstrapHelper, $location, authorService) {

        var that = this;

        this.id = $routeParams.bookId;

        //the rate book function
        this.rate = rateBookFunction;

        if (!this.id) {//no book id specified
            bootstrapHelper.addAlert("No book specified");
            //redirect to home
            $location.path('/');
            return;
        }

        this.book = {};
        this.otherBooks = [];
        this.similarBooks = [];
        this.maxRating = 10;
        this.ratingReadOnly = false;
        this.bookRating = 0;
        this.showRatingForm = false;
        this.newBookRating = {};
        this.ratingErrors = [];

        init();

        function init() {
            //get the book details
            getBookDetails();
            //get similar books
            bookService.similarBooks(that.id, 1, 5).then(function (response) {
                that.similarBooks = response.data;
            }, function (response) {
                var message = "An error occured while fetching similar books. Error message: " + response.statustext;
                bootstrapHelper.addAlert(message);
            });
            //do the ratings thingies
            bookService.rating(that.id).then(function (response) {
                that.bookRating = response.data.rating;
            }, function (response) {
                var message = "Error while fetching rating. Error message: " + response.statustext;
                bootstrapHelper.addAlert(message);
            });
        }

        function getBookDetails() {
            bookService.get(that.id).then(function (response) {//for success
                that.book = response.data;
            }, function (response) {//for failure
                var message = "Couldn't get book details. Error message: " + response.statustext;
                bootstrapHelper.addAlert(message);
            }).then(function (response) {
                authorService.getBooks(that.book.author.id, 1, 5).then(function (response) {
                    that.otherBooks = response.data;
                }, function (response) {
                    var message = "An error occured while fetching other books. Error message: " + response.statustext;
                    bootstrapHelper.addAlert(message);
                });
            });
        }

        function rateBookFunction() {
            if (validateRatingData()) {
                bookService.rate(this.id, this.newBookRating).then(function (response) {
                    bootstrapHelper.addAlert("Book rated!", "success");
                    alert("Successfully rated book");
                }, function (response) {
                    var message = "Failed to rate book. Error message: " + response.statustext;
                    bootstrapHelper.addAlert(message);
                });
            }
        }

        function validateRatingData() {
            var fields = ['rating', 'comment', 'title', 'name'];
            for (var fieldIndex in fields) {
                if (!that.newBookRating[fields[fieldIndex]]) {
                    that.ratingErrors.push(fields[fieldIndex] + " must be filled");
                }
            }
            return that.ratingErrors.length === 0;
        }
    }

})();