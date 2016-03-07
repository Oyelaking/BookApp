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
          type : 'integer',
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
      }
  }
};

