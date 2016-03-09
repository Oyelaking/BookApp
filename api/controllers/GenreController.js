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
    }
};

