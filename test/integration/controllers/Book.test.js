/**
 * Test file for Book controller test. It tests the two custom actions created,
 * namely: similarBooks and otherBooks
 */

describe('BookController', function () {

    /**
     * Test the similar books functionalites first.
     * 
     * What's being tested?
     * 1. It fetches books in the same genre as current book
     * 2. It doesn't fetch the current book with them
     * 3. It sorts by yearPublished desc
     * 
     * @returns {undefined}
     */
    describe('similarBooks', function () {

//        var request = require('supertest');
        var assert = require('assert');
        
        it('Fetches books in the same genre as book provided', function (done) {
            assert.equal(1, 2);
            done();
        });
    });
});