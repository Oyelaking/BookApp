/* global BookRating */

/**
 * BookRatingController
 *
 * @description :: Server-side logic for managing Bookratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * Override blueprint's create api to handle ratings creation.
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {undefined}
     */
    create: function (req, res) {
        var createData = req.body;
        console.log("CreateData: " + JSON.stringify(createData));
        //make sure that the use has not rated the book before
//        BookRating.findOne({
//            'user_session': sessionId,
//            'book.id': createData.book
//        }).exec(function(err, ));
        BookRating.create(createData).exec(sendResponse);
        function sendResponse(err, createdRating) {
            if (err) {
                return res.serverError(err.message);
            }
            return res.json(createdRating);
        }
    },
    /**
     * Performs bulk updates
     * @param {Request} req
     * @param {Response} res
     * @returns {undefined}
     */
    bulkCreate: function (req, res) {
        console.log("In bulk create...");
        /**
         * 
         * @type array
         */
        var data = req.body;
        if (!data.length) {
            return res.badRequest("Invalid request data");
        }
        var response = [];
        data.forEach(function (element) {
            //first check that if an id is specified, the id doesn't already exist in the db
            if (element.id) {
                BookRating.findOne(element.id).exec(function (err, foundRecord) {
                    if (foundRecord) {
                        element.error = {
                            "message": "A record with the id already exists"
                        };
                        response.push(element);
                    } else {
                        createBook(element);
                    }
                });
            } else {
                createBook(element);
            }

            function createBook(ratingData) {
                console.log("Creating record...");
                BookRating.create(ratingData).exec(function (err, createdResponse) {
                    if (err) {
                        console.log("Failed to create record: " + JSON.stringify(err));
                        ratingData.error = err;
                        response.push(ratingData);
                    } else {
                        console.log("Successfully created record with id: " + ratingData.id);
                        response.push(createdResponse);
                    }
                });
            }
        });
        //send response
        return res.json(response);
    }

};

