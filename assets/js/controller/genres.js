/*
 * Controller for the genres page.
 */
(function () {
    var module = angular.module("bookApp.controller.genres", [
        "bookApp.service.genre"
    ]);

    module.controller('genresCtrl', ['genreService', genresCtrl]);

    function genresCtrl(genreService) {
        alert("hi form Genres");

        var that = this;

        this.genres = [];

        init();
        
        function init() {
            genreService.list().then(function (response) {
                that.genres = response.data;
            }, function (response) {
                alert("Failed to load genres list.");
            });
        }
    }
})();