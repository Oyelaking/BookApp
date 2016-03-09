/*
 * Service for rating books
 */

module.exports = {
    //calulates average rating. This is static so that be called from anywhre
    calculateRating: function (record, callBack) {
        //we have to get the current average rating
        Book.findOne(record.book).exec(calculateNewRating);
        function calculateNewRating(err, book) {
            if (err) {
                return callBack(err);
            }
            var currentAverage = book.rating || 1;
            BookRating.count({'book': book.id}).exec(newRatingWithNewCount);

            function newRatingWithNewCount(err, newCount) {
                console.log("New count: " + newCount);
                console.log("New Rating: " + record.rating);
                console.log("Current Average: " + currentAverage);
                if (err) {
                    return callBack(err);
                }
                //the formular is ((currentAverage * number of ratings records - 1) + newRating)/number of ratings records 
                var newAvg;
                if (newCount === 1) {
                    newAvg = record.rating;
                } else {
                    newAvg = ((currentAverage * (newCount - 1)) + record.rating) / newCount;
                }
                //now update the book record
                Book.update({id: book.id}, {rating: newAvg}).exec(function (err, updatedBook) {
                    if (err) {
                        callBack(err);
                    }
                    callBack();
                });
            }
        }
    }
};