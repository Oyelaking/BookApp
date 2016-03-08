/* global Book */

/**
 * Book.js
 *
 * @description :: Book model to model book
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        title: {
            type: 'string',
            notEmpty: true
        },
        description: {
            type: 'string'
        },
        yearPublished: {
            type: 'integer',
            min: 1900,
            max: new Date().getFullYear()
        },
        author: {
            model: 'author'
        },
        genre: {
            model: 'genre'
        },
        ratings: {
            collection: 'bookrating',
            via: 'book'
        },
        /**
         * Gets the average rating for a book
         * 
         * @param {string|object} options the record or bookId to get the average
         * rating for
         * @param {function} callBack
         * @returns {undefined}
         */
        averateRating: function () {
            var totalRatings = 0;
            this.ratings.forEach(function (value, key) {
                totalRatings += value.rating;
            });
            return callBack(null, totalRatings / book.ratings.length);
        }
    },
    /**
     * 
     * @param {object|string} options
     * @param {function} callBack
     * @returns {undefined}
     */
    findSimilarBooks: function (options, callBack) {
        typeof options.book === "object" ? findSimilarBooks(null, options.book)
                : Book.findOne(options.book).exec(findSimilarBooks);
        function findSimilarBooks(err, book) {
            if (err) {
                return callBack(new Error("An error occured while retrieving the book"));
            }
            if (!book) {
                return callBack(new Error("The book could not be located"));
            }

            var skip = options.skip || 0;
            var limit = options.limit || 5;
            //criteria used for similar books are books in the same genre ordered by ratings
            Book.find({
                where: {
                    'genre.id': book.genre.id,
                    'id': {'!': book.id}
                },
                skip: skip,
                limit: limit,
                sort: 'yearPublished DESC'
            }).populate('author').exec(function (err, books) {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, books);
                }
            });
        }
    }
};

