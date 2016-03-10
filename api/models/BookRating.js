/* global BookRatingService */

/**
 * BookRating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        user_session: {
            type: 'string',
            notEmpty: true,
            required: true
        },
        comment: {
            type: 'string',
            required: true
        },
        rating: {
            type: 'integer',
            required: true,
            min: 0,
            max: 10
        },
        name: {
            type: 'string',
            required: true
        },
        title: {
            type: 'string',
            required: true
        },
        book: {
            model: 'book'
        }
    },
    afterUpdate: function (record, callBack) {
        BookRatingService.calculateRating(record, callBack);
    },
    afterCreate: function (record, callBack) {
        BookRatingService.calculateRating(record, callBack);
    }
};

