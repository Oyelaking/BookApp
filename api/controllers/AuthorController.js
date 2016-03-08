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
    }
};

