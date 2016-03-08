
module.exports = {
    
    attributes: {
        book: {
            model: 'book'
        },
        session_id: {
            type: 'string',
            notEmpty: true
        },
        comment: {
            type: 'string'
        },
        rating: {
            type: 'float',
            min: 0,
            max: 5
        }
    }
};