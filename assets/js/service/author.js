/**
 * Author service to perform author related services.
 * 
 * @author Gbadebo Oyelakin
 */

//in our continous struggle against global variables clash, we define the module
//in an anonymous function and execute it immediately.
(function(){
    
    var module = angular.module("bookApp.service.author", []);
    
    module.service('authorService', ['$http', authorService]);
    
    /*
     * Performs REST API requests to the backend for the author resource.
     * 
     * What it can do:
     * 1. List all authors
     * 2. Paginate authors with page and limit
     * 3. List all the books for an author
     * 4. Search Authors
     * 5. Search Author books
     */
    function authorService($http){
        
        var endPoint = "/author";
        var defaultLimit = 10;
        
        this.list = function(page, limit){
            page = !isNaN(page) ? page : 1;
            limit = !isNaN(limit) ? limit : defaultLimit;
            var dataObj = {
                skip: page - 1 * limit,
                limit: limit
            };
            var url = endPoint + "?" + urlHelper.buildParams(dataObj);
            return $http.get(url);
        };
        
        this.getBooks = function (authorId, page, limit){
            var url = endPoint + "/" + authorId + "/books";
            return $http.get(url);
        };
    }
})();