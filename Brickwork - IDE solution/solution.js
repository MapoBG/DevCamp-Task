const { getResult, generateFirstLayer, setColValue, validateInput, getBrickNumbers, generateSecondLayer } = require("./utils");

function solve(dimensions, InputLayer) {
    const [wallWidth, wallLength] = dimensions.split(" ").map(Number);
    InputLayer = InputLayer.split(" ");

    const firstLayer = generateFirstLayer(InputLayer,wallWidth, wallLength);            //generating the first layer based on the input 

    validateInput(wallWidth, wallLength, firstLayer);                                   // validating input data

    let secondLayer = generateSecondLayer(wallWidth, wallLength);                       //creating a "skeleton" for the second layer

    let brickNumbers = getBrickNumbers(firstLayer);                                     // creating brick numeration based on input

    for (let i = 0; i < firstLayer.length; i++) {
        const row = firstLayer[i];

        for (let j = 0; j < row.length; j++) {
            const brickNumRow = row[j];
            const nextBrickNumRow = row[j + 1];

            if (brickNumRow != nextBrickNumRow && nextBrickNumRow) {
                const currentBrickNum = brickNumbers.shift();
                secondLayer[i][j] = currentBrickNum;
                secondLayer[i][j + 1] = currentBrickNum;
                j++;
            }
        }
    }

    for (let k = 0; k < secondLayer.length; k++) {
        const row = secondLayer[k];

        for (let col = 0; col < row.length; col++) {
            const brickNumCol = setColValue(secondLayer[k], col);
            const nextBrickNumCol = setColValue(secondLayer[k + 1], col);

            if (brickNumCol == null && nextBrickNumCol == null) {
                const currentBrickNum = brickNumbers.shift();
                secondLayer[k][col] = currentBrickNum;
                secondLayer[k + 1][col] = currentBrickNum;
            }
        }
    }

    let isImpossible = false;

    secondLayer.forEach(row => {
        row.forEach(brick => {
            if (brick == null) {
                isImpossible = true;
            }
        });
    });

    let result = "";

    if (isImpossible) {
        console.log("-1\nNo solution exists!");
    } else {
        result = getResult(secondLayer);
        console.log(result);
    }
}
//since JS can't read input from the console, in the IDE it's only possible to pass the input as arguments to a function. This should be the closest to the description type of input.
solve("4 2", "1 2 2 12 5 7 7 16 1 10 10 12 5 15 15 16 9 9 3 4 4 8 8 14 11 11 3 13 13 6 6 14");