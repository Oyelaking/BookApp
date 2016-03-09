/*
 * Directive for including booklist template
 */

(function(){
    
    var module = angular.module("bookApp.directive.bookList", []);
    
    module.directive('bookList', bookListFunction);
    
    function bookListFunction(){
        return {
            templateUrl: '/templates/_book_list.html',
            scope: {
                books: '=books'
            }
        };
    }
    
})();