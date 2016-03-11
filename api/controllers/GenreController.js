/**
 * GenreController
 *
 * @description :: Server-side logic for managing Genres
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {undefined}
     */
    getBooks: function (req, res) {
        var genreId = req.params.id || req.query.id;
        if (!genreId) {
            return res.badRequest("No genreId specified");
        }
        var skip = req.query.skip || 0;
        var limit = req.query.limit || 5;
        Book.find({where: {'genre.id': genreId}, skip: skip, limit: limit, sort: "title"})
                .exec(sendResponse);
        function sendResponse(err, books) {
            if (err) {
                return res.serverError(err.message);
            }
            return res.end(JSON.stringify(books));
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
                Genre.findOne( element.id).exec(function (err, foundRecord) {
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

            function createBook(genreData) {
                console.log("Creating record...");
                Genre.create(genreData).exec(function (err, createdResponse) {
                    if (err) {
                        console.log("Failed to create record: " + JSON.stringify(err));
                        genreData.error = err;
                        response.push(genreData);
                    } else {
                        console.log("Successfully created record with id: " + genreData.id);
                        response.push(createdResponse);
                    }
                });
            }
        });
        //send response
        return res.json(response);
    }
};

