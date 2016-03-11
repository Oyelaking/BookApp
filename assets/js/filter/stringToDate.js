/* 
 * Functions registered to the advertiser namespace
 */

/* global angular */

(function () {
    
    var module = angular.module('bookApp.filter.strToDate', []);

    module.filter('strToDate', function () {
        var filterFunc = function (dateString) {
            if(!dateString || dateString.trim() === ""){
                return "";
            }
            //parse the date string into year, month, day, minute, hour, second
            var parsedDate = parse();
            var dateObj = new Date(
                    parsedDate.year,
                    parsedDate.month,
                    parsedDate.day,
                    parsedDate.hours,
                    parsedDate.mins,
                    parsedDate.secs
                    );

            function parse() {
                //first normalize the date string by removing unnecessary whitespace
                dateString = dateString.trim().replace(/\s+/, " ");
                var parsedObj = {};
                var dateSplitChar = dateString.indexOf("/") >=0 ? "/" : "-";
                var dateParts = dateString.split(" ");
                var dateSplitted = dateParts[0] ? dateParts[0].split(dateSplitChar) : [];
                var timeSplitted = dateParts[1] ? dateParts[1].split(":") : [];
                parsedObj.month = dateSplitted[1] - 1 || 0;
                if (dateSplitted.length >= 2 && dateSplitted[2].length === 4) {
                    parsedObj.year = dateSplitted[2] || 0;
                    parsedObj.day = dateSplitted[0] || 0;
                } else {
                    parsedObj.year = dateSplitted[0] || 0;
                    parsedObj.day = dateSplitted[2] || 0;
                }
                parsedObj.hours = timeSplitted[0] || 0;
                parsedObj.mins = timeSplitted[1] || 0;
                parsedObj.secs = timeSplitted[2] || 0;
                return parsedObj;
            }

            return dateObj || "";
        };
        return filterFunc;
    });
})();