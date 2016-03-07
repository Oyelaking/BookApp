
module.exports = {
    
    attributes: {
        book: {
            model: 'book'
        },
        session_id: {
            type: 'string',
            notEmpty: true
        },
        rating: {
            type: 'float',
            min: 0,
            max: 5
        }
    }
};