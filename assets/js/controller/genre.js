/*
 * Module containing the controller for the book
 */

(function(){
    
    var module = angular.module("bookApp.controller.genre", [
        'bookApp.service.genre'
    ]);
    
    module.controller("genreCtrl", ['$routeParams', 'genreService', genreCtrl]);
    
    function genreCtrl($routeParams, genreService){
        
        var that = this;
        this.genre = {};
        this.books = [];
        this.id = $routeParams.genreId;
        
        init();
        
        function init(){
            genreService.get(that.id).then(function(response){
                that.genre = response.data;
                genreService.list(that.id).then(function(response){
                    that.books = response.data;
                }, function(response){
                    alert("Failed to load books in genre");
                });
            }, function(response){
                alert("Failed to load data");
            });
        }        
    }
    
})();