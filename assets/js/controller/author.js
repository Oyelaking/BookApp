/*
 * Author controller module
 *  
 */

(function(){
    
    var module = angular.module('bookApp.controller.author', [
        'bookApp.service.author'
    ]);
    
    module.controller('authorCtrl', ['authorService', authorCtrl]);
    
    function authorCtrl(authorService){
        
    }
    
})();