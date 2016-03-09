/*
 * Controller for the authors page.
 */
(function () {
    var module = angular.module("bookApp.controller.authors", [
        "bookApp.service.author"
    ]);
    module.controller('authorsCtrl', ['authorService', authorsCtrl]);
    
    function authorsCtrl(authorService) {
        
        var that = this;
        this.authors = [];
        
        init();
        
        function init(){
            authorService.list().then(function(response){
                that.authors = response.data;
            }, function(response){
                var message = "Failed to fetch authors. Server error: " + response.statusText;
                alert(message);
            });
        }
    }
    
})();