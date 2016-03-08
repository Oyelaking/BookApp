/* global angular */

/**
 * Created by Gbadebo
 */

/**
 * This service provides useful url methods
 */
(function () {

    var module = angular.module("bookApp.service.urlHelper", []);

    module.service("urlHelper", [urlHelperService]);

    /**
     * 
     * @returns {urlHelper_L10.urlHelperService}
     */
    function urlHelperService() {

        /**
         * Builds an array or object into a url string.
         *
         * @param paramObject object|array the object or array to turn into a url string
         * @returns string the query part of a url e.g param1=value1&param2=value2
         */
        this.buildParams = function (paramObject) {
            if (typeof paramObject !== "object") {
                return "";
            }
            var params = buildParamsParams(paramObject);
            return params.join("&");
            //this inner function does the actual url parameter building. We make
            //it a closure because the caller should not be able to determine if the
            //function should nest(i.e should not be able to specify the value of the
            //the second argument)
            function buildParamsParams(paramObject, prepend) {
                prepend = prepend || "";
                var paramsArray = [];
                for (var paramKey in paramObject) {
                    if (paramObject.hasOwnProperty(paramKey) && typeof paramObject !== "function") {
                        var keyStr = prepend + (prepend ? "[" + (typeof paramKey === "number" ? "" : paramKey) + "]" :
                                paramKey);
                        if (typeof paramObject[paramKey] === "object") {
                            paramsArray = paramsArray.concat(buildParamsParams(paramObject[paramKey], keyStr));
                        } else {
                            paramsArray[paramsArray.length] = keyStr + "=" + encodeURIComponent(paramObject[paramKey]);
                        }
                    }
                }
                return paramsArray;
            }
        };
    }
})();