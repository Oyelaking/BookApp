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
            res.end(JSON.stringify(books));
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
    }
};

