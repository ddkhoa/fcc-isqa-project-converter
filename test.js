function getNum(input) {
    var result;

    let firstAlphabetCharIndex = 0;

    for (let i = 0; i < input.length; i = i + 1) {
        console.log(input.charCodeAt(i));
        if (97 <= input.charCodeAt(i) && input.charCodeAt(i) <= 122) {
            firstAlphabetCharIndex = i;
            break;
        }

        if (65 <= input.charCodeAt(i) && input.charCodeAt(i) <= 90) {
            firstAlphabetCharIndex = i;
            break;
        }
    }

    result = input.slice(0, firstAlphabetCharIndex);
    return parseFloat(result);
};

console.log(getNum("32L"));