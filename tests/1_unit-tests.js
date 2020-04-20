/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getNum(input)', function () {

        test('Whole number input', function (done) {
            var input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal Input', function (done) {

            var input = '0.5lbs';
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });

        test('Fractional Input', function (done) {

            var input = '2/6gal';
            assert.equal(convertHandler.getNum(input), 2 / 6);
            done();
        });

        test('Fractional Input w/ Decimal', function (done) {

            var input = '0.1/6gal';
            assert.equal(convertHandler.getNum(input), 0.1 / 6);
            done();
        });

        test('Invalid Input (double fraction)', function (done) {

            var input = '3/7.2/4gal';
            assert.equal(convertHandler.getNum(input), "invalid number");
            done();
        });

        test('No Numerical Input', function (done) {

            var input = 'km';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

    });

    suite('Function convertHandler.getUnit(input)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                assert.equal(convertHandler.getUnit(ele), ele);
            });
            done();
        });

        test('Unknown Unit Input', function (done) {

            var input = "abc";
            assert.equal(convertHandler.getUnit(input), "invalid unit");
            done();
        });

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            var expect = ['gallon', 'litre', 'mile', 'kilometer', 'pound', 'kilogram'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.convert(num, unit)', function () {

        test('Gal to L', function (done) {
            var input = [5, 'gal'];
            var expected = 18.9271;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('L to Gal', function (done) {

            var input = [12, 'l'];
            var expected = 3.1701;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Mi to Km', function (done) {

            var input = [3, 'mi'];
            var expected = 4.828;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Km to Mi', function (done) {

            var input = [20, 'km'];
            var expected = 12.4274;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Lbs to Kg', function (done) {

            var input = [5, 'lbs'];
            var expected = 2.2680;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Kg to Lbs', function (done) {

            var input = [2, 'kg'];
            var expected = 4.4092;
            assert.approximately(convertHandler.getReturnNum(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

    });

});