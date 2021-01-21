function generateFirstLayer(layer, wallWidth, wallLength) {                                     //generating the first layer based on the input 
    const result = [];

    if (wallLength == 0 || wallWidth == 0) {
        validateInput(wallWidth, wallLength, result);
    }

    for (let e = 0; e < layer.length; e += wallLength) {
        const currentRow = layer.slice(e, wallLength + e);
        result.push(currentRow);
    }

    return result;
}

function validateInput(wallWidth, wallLength, firstLayer) {                                     // Validate input data
    let isCorrectLength = true;

    if (wallWidth > 99 || wallLength > 99) {
        throw new Error("Invalid input!\nDimensions should be less than 100.");
    }

    if (wallLength % 2 != 0 || wallWidth % 2 != 0 || wallLength == 0 || wallWidth == 0) {
        throw new Error("Invalid input!");
    }

    for (const row of firstLayer) {
        if (row.length > wallLength) {
            isCorrectLength = false;
            break;
        }
    }

    if (firstLayer.length != wallWidth) {
        throw new Error("Invalid input!\nInput width doesn't match first layer input.");
    } else if (!isCorrectLength) {
        throw new Error("Invalid input!\nInput length doesn't match first layer input.");
    }

    for (let i = 0; i < firstLayer.length; i++) {
        const row = firstLayer[i];

        for (let j = 0; j < row.length; j++) {
            const brickNumRow = row[j];
            const nextBrickNumRow = row[j + 2];

            let brickNumCol = setColValue(firstLayer[i], j);
            let nextBrickNumCol = setColValue(firstLayer[i + 2], j);

            if (brickNumRow == nextBrickNumRow || (brickNumCol == nextBrickNumCol && (brickNumCol || nextBrickNumCol))) {
                throw new Error("Bricks can't have length bigger than 2x2.");
            }
        }
    }
}

function generateSecondLayer(wallWidth, wallLength) {                                           //creating a "skeleton" for the second layer
    let secondLayer = [];
    secondLayer[wallWidth - 1] = [];
    secondLayer.fill(0);
    secondLayer = secondLayer.map(el => {
        el = [];
        el.length = wallLength;
        return el.fill(null);
    });

    return secondLayer;
}

function getBrickNumbers(layer) {                                                               // creating brick numeration based on input
    result = layer
        .reduce((acc, cur) => acc.concat(cur))
        .filter((val, index, arr) => arr.indexOf(val) == index)
        .map(Number)
        .sort((a, b) => a - b);

    return result;
}

function setColValue(value, index) {                                                             //small function not to repeat the same code multiple times
    return value = value ? value[index] : value;
}

function getResult(layer) {                                                                     //function to get final visual result
    let result = "";

    for (let i = 0; i < layer.length; i++) {
        const row = layer[i];
        let currentRowResult = "";

        for (let c = 0; c < row.length; c++) {
            const firstHalfBrick = row[c];
            const secondtHalfBrick = row[c + 1];

            if (firstHalfBrick == secondtHalfBrick) {
                currentRowResult += `*${firstHalfBrick} ${secondtHalfBrick}*`;
                c++;
            } else {
                currentRowResult += `*${firstHalfBrick}`;
            }
        }
        currentRowResult += "*";

        while (currentRowResult.includes("**")) {
            currentRowResult = currentRowResult.replace("**", "*");
        }

        let symbols = currentRowResult.length;

        if (i == 0) {
            result += `${"*".repeat(symbols)}\n` + currentRowResult + "\n";
        } else if (i == layer.length - 1) {
            symbols = getSymbols(layer, i - 1, currentRowResult);
            result += symbols + "\n" + `${currentRowResult}\n`;
            symbols = currentRowResult.length;
            result += `${"*".repeat(symbols)}`;
        } else {
            symbols = getSymbols(layer, i - 1, currentRowResult);
            result += symbols + "\n" + currentRowResult + "\n";
        }
    }

    return result;
}

function getSymbols(layer, index, currentRowResult) {                                           //help function to get final visual result
    let symbols = "*";

    for (let i = index; i <= index; i++) {
        const row = layer[i];

        for (let j = 0; j < row.length; j++) {
            const brickNumCol = setColValue(layer[i], j);
            const nextBrickNumCol = setColValue(layer[i + 1], j);

            const nextBrickNumRow = layer[i][j + 1];

            if (brickNumCol == nextBrickNumCol) {
                symbols += `${" ".repeat(brickNumCol.toString().length)}*`;
            } else {
                symbols += `${"*".repeat(brickNumCol.toString().length)}`;
            }

            if (brickNumCol == nextBrickNumRow) {
                symbols += "**";
            }
        }
    }

    const symbolsDifference = currentRowResult.length - symbols.length;

    if (symbolsDifference) {
        symbols += "*".repeat(symbolsDifference);
    }

    return symbols;
}

module.exports = {
    getBrickNumbers,
    generateSecondLayer,
    getResult,
    generateFirstLayer,
    setColValue,
    validateInput
}