/*
 * A module to handle some utility tasks such as opening alerts closing them e.t.c
 */

//Global Abatement Initiatize
(function () {

    var utilModule = angular.module("bookApp.service.util", []);

    utilModule.service('bootstrapHelper', ['$rootScope', bootstrapHelper]);

    function bootstrapHelper($rootScope) {

        this.addAlert = function (message, type) {
            type = type || "warning";
            $rootScope.addAlert = function () {
                $rootScope.alerts.push({msg: message, type: type});
            };
        };

        this.closeAlert = function (index) {
            $rootScope.closeAlert = function () {
                $rootScope.alerts.splice(index, 1);
            };
        };
    }

})();