/*
 * Module containing the controller for the book
 */

(function(){
    
    var module = angular.module("bookApp.controller.genre", [
        'bookApp.service.genre'
    ]);
    
    module.controller("genreCtrl", ['genreService', genreCtrl]);
    
    function genreCtrl(genreService){
        
    }
    
})();