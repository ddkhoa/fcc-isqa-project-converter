/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    var convertHandler = new ConvertHandler();

    app.route('/api/convert')
        .get(function (req, res) {
            var input = req.query.input;
            var output = convertHandler.convert(input);
            res.json(output);
        });

};
