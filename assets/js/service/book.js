/**
 * The book service to help in fetching books.
 * 
 * @author Gbadebo Oyelakin
 */

//the code is encased in an anonymous function to enhance global abatement
(function () {
    var bookServiceModule = angular.module("bookApp.service.book", ['bookApp.service.urlHelper']);

    bookServiceModule.service('bookService', ['$http', 'urlHelper', bookService]);

    /**
     * Helps in making REST API requests to the server concerning books.
     * 
     * What it can do:
     * 1. Get the details for a book
     * 2. List books
     * 3. List books using page and limit to paginate
     * 4. Perform search on books
     * 5. Get similar books
     * 
     * All API methods return a promise
     * 
     * @param {object} $http
     * @param {object} urlHelper
     * @returns {undefined}
     */
    function bookService($http, urlHelper) {

        var endPoint = "/book";
        var defaultLimit = 10;

        /**
         * Lists books.
         * 
         * @param {type} page
         * @param {type} limit
         * @returns {undefined}
         */
        this.list = function (page, limit) {
            page = !isNaN(page) ? page : 1;
            limit = !isNaN(limit) ? limit : defaultLimit;
            var dataObj = {
                skip: page - 1 * limit,
                limit: limit
            };
            var url = endPoint + "?" + urlHelper.buildParams(dataObj);
            return $http.get(url);
        };

        /**
         * Gets the details for a single book given its id.
         * 
         * @param {string} bookId
         * @returns {object}
         */
        this.get = function (bookId) {
            var url = endPoint + "/" + bookId;
            return $http.get(url);
        };
        
        this.similarBooks = function(bookId, page, limit){
            page = !isNaN(page) ? page : 1;
            limit = !isNaN(limit) ? limit : defaultLimit;
            var dataObj = {
                skip: page - 1 * limit,
                limit: limit
            };
            var url = endPoint + "/similarBooks?id=" + bookId + "&" + urlHelper.buildParams(dataObj);
            return $http.get(url);
        };

        /**
         * Performs book search.
         * 
         * @param {object} criteria the criteria to use in performing the search.
         * Supported keys:
         *      - keyword:String - the keyword to use to search
         *      - yearPublished: int - the year published
         *      - page: int - used in pagination
         *      - limit: int - used in pagination
         * @returns {promiseObject}
         */
        this.search = function (criteria) {

        }
    }
})();