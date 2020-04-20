/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

    this.convert = function (input) {

        var initNum = this.getNum(input);
        var initUnit = this.getUnit(input);

        if (initNum == "invalid number" && initUnit == "invalid unit") {
            return { error: "invalid number and unit" };
        }

        if (initNum == "invalid number") {
            return { error: "invalid number" }
        }

        if (initUnit == "invalid unit") {
            return { error: "invalid unit" }
        }

        var returnNum = this.getReturnNum(initNum, initUnit);
        var returnUnit = this.getReturnUnit(initUnit);

        initNum = Math.round(initNum * 100000) / 100000;
        returnNum = Math.round(returnNum * 100000) / 100000;

        var toString = this.getString(initNum, initUnit, returnNum, returnUnit);
        return { initNum, initUnit, returnNum, returnUnit, toString };
    }

    this.getNum = (input) => {

        if (input.indexOf("/") != input.lastIndexOf("/")) {
            return "invalid number";
        }

        let firstAlphabetCharIndex = 0;

        for (let i = 0; i < input.length; i = i + 1) {
            if (97 <= input.charCodeAt(i) && input.charCodeAt(i) <= 122) {
                firstAlphabetCharIndex = i;
                break;
            }

            if (65 <= input.charCodeAt(i) && input.charCodeAt(i) <= 90) {
                firstAlphabetCharIndex = i;
                break;
            }
        }

        if (firstAlphabetCharIndex == 0) {
            return 1;
        }

        let result = input.slice(0, firstAlphabetCharIndex);
        return eval(result);    // work with integer, float, fraction
    };

    this.getUnit = function (input) {
        var result;
        var acceptedUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

        result = input.match(/[a-zA-Z]+/)[0];
        if (!acceptedUnits.includes(result)) {

            return "invalid unit";
        }

        return result;
    };

    this.spellOutUnit = function (unit) {
        var result;
        var unitLowerCase = unit.toLowerCase();
        const convertData = {
            "gal": { spellOut: 'gallon' },
            "l": { spellOut: 'litre' },
            "lbs": { spellOut: 'pound' },
            "kg": { spellOut: 'kilogram' },
            "mi": { spellOut: 'mile' },
            "km": { spellOut: 'kilometer' },
        }

        result = convertData[unitLowerCase].spellOut;
        return result;
    };

    this.getReturnNum = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        var initUnitLowerCase = initUnit.toLowerCase();
        const convertData = {
            "gal": { factor: galToL }, // input gal, convert to L
            "l": { factor: 1 / galToL },
            "lbs": { factor: lbsToKg },
            "kg": { factor: 1 / lbsToKg },
            "mi": { factor: miToKm },
            "km": { factor: 1 / miToKm }
        }

        const { factor } = convertData[initUnitLowerCase];

        var result = initNum * factor;

        return result;
    };

    this.getReturnUnit = function (initUnit) {
        var result;

        const convertData = {
            "gal": { outputUnit: "l" },
            "l": { outputUnit: "gal" },
            "lbs": { outputUnit: "kg" },
            "kg": { outputUnit: "lbs" },
            "mi": { outputUnit: "km" },
            "km": { outputUnit: "mi" },

        }

        result = convertData[initUnit.toLowerCase()].outputUnit;

        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        var result;

        initUnit = this.spellOutUnit(initUnit);
        returnUnit = this.spellOutUnit(returnUnit);

        result = `${initNum}${initUnit}s converts to ${returnNum}${returnUnit}s`;
        return result;
    };

}

module.exports = ConvertHandler;
