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
        //get the session id from session
        var sessionId = req.session.sid;
        console.log("SessionId: " + sessionId);
        if (!sessionId) {
            return res.badRequest("Could not identify you. Make sure cookies are enabled");
        }
        var createData = req.body;
        console.log("CreateData: " + JSON.stringify(createData));
        createData.user_session = sessionId;
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
    }

};

