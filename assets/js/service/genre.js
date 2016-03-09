/**
 * Service file to handle genre quering
 */

//As is our habit, to advance Global Abatement, we use an anonymous function
(function () {

    var module = angular.module("bookApp.service.genre", [
        'bookApp.service.urlHelper'
    ]);

    module.service("genreService", ['$http', 'urlHelper', genreService]);

    /*
     * Makes Http requests to the backend concerning the genre resource
     * 
     * What it can do:
     * 1. List all the genres
     * 2. List all the books for a genre
     * 3. List all the authors who have a book in a genre
     * 4. Search books in a genre
     * 5. Search authors in a genre
     * 6. Supports pagination via page and limit for all end points
     */
    function genreService($http, urlHelper) {

        var endPoint = "/genre";
        var defaultLimit = 10;

        this.list = function () {
            var url = endPoint;
            return $http.get(url);
        };
        
        this.get = function(genreId) {
            var url = endPoint + "/" + genreId;
            return $http.get(url);
        };

        this.getBooks = function (id, page, limit) {
            page = !isNaN(page) ? page : 1;
            limit = !isNaN(limit) ? limit : defaultLimit;
            var dataObj = {
                skip: page - 1 * limit,
                limit: limit
            };
            var url = endPoint + "/getBooks/" + id + "?" + urlHelper.buildParams(dataObj);
            return $http.get(url);
        };
    }

})();