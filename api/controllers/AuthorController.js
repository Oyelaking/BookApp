/**
 * AuthorController
 *
 * @description :: Server-side logic for managing Authors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {undefined}
     */
    books: function (req, res) {
        var authorId = req.param("id");
        if (!authorId) {
            return res.badRequest("No author specified");
        }
        var skip = req.query.skip || 0;
        var limit = req.query.limit || 5;
        Book.find({where: {
                'author.id': authorId
            },
            skip: skip,
            limit: limit,
            sort: "title"
        }).exec(respond);
        function respond(err, books) {
            if (err) {
                return res.serverError(err.message || "An error occured. Couldn't fetch books");
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
                Author.findOne(element.id).exec(function (err, foundRecord) {
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

            function createBook(authorData) {
                console.log("Creating record...");
                Author.create(authorData).exec(function (err, createdResponse) {
                    if (err) {
                        console.log("Failed to create record: " + JSON.stringify(err));
                        authorData.error = err;
                        response.push(authorData);
                    } else {
                        console.log("Successfully created record with id: " + authorData.id);
                        response.push(createdResponse);
                    }
                });
            }
        });
        //send response
        return res.json(response);
    }
};

