/* global Waterline.Model Book */

/**
 * BookController
 *
 * @description :: Server-side logic for managing Books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {undefined}
     */
    similarBooks: function (req, res) {
        var bookId = req.params.bookId || req.query.id;
        if (!bookId) {
            return res.badRequest("No book id specified");
        }
        var skip = req.query.skip || 0;
        var limit = req.query.limit || 5;
        Book.findSimilarBooks({
            book: bookId,
            skip: skip,
            limit: limit
        }, findSimilarBooks);
        function findSimilarBooks(err, books) {
            if (err) {
                return res.serverError(err.message || "An error occured while retrieving the book");
            }
            if (!books) {
                return res.notFound("No similar books could be found");
            }
            res.set("Content-Type", "text/json");
            res.json(books);
        }
    },
    
    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @returns {unresolved}
     */
    otherBooks: function (req, res) {
        var bookId = req.params.bookId || req.query.id;
        if (!bookId) {
            return res.badRequest("No book id specified");
        }
        var skip = req.query.skip || 0;
        var limit = req.query.limit || 5;
        //find the book first
        Book.findOne(bookId).exec(findBooks);
        function findBooks(err, book) {
            if (err) {
                return respond(err);
            }
            Book.find({where: {
                    'author.id': book.author.id,
                    'id': {'!': bookId}
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
                Book.findOne(element.id).exec(function (err, foundRecord) {
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

            function createBook(bookData) {
                console.log("Creating book");
                Book.create(bookData).exec(function (err, createdResponse) {
                    if (err) {
                        console.log("Failed to create book: " + JSON.stringify(err));
                        bookData.error = err;
                        response.push(bookData);
                    } else {
                        console.log("Successfully created book with id: " + bookData.id);
                        response.push(createdResponse);
                    }
                });
            }
        });
        //send response
        return res.json(response);
    }
};

