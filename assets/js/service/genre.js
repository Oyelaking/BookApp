/**
 * Service file to handle genre quering
 */

//As is our habit, to advance Global Abatement, we use an anonymous function
(function(){
    
    var genreService = angular.module("bookApp.service.genre", []);
    
    genreService.service("genreService", ['$http', genreService]);
    
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
    function genreService($http){
        
    }
    
})();