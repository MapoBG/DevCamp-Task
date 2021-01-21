function solve() {
    let textAreaEl = document.getElementsByName("input")[0];
    document.getElementById("calculate").addEventListener("click", solution);
    let resultEl = document.getElementById("output");

    function solution() {
        const [dimensions, ...InputLayer] = textAreaEl.value.trim().split("\n");    //getting input data from browser
        const [wallWidth, wallLength] = dimensions.split(" ").map(Number);

        const firstLayer = InputLayer.map(row => {                                  //generating the first layer based on the input 
            return row = row.split(" ");
        });

        validateInput(wallWidth, wallLength, firstLayer);

        let secondLayer = generateSecondLayer(wallWidth, wallLength);               //creating a "skeleton" for the second layer

        let brickNumbers = getBrickNumbers(firstLayer);                             // creating brick numeration based on input

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
            result = "-1\nNo solution exists!";
        } else {
            result = getResult(secondLayer);
        }

        resultEl.value = `${result}`;
    }
}

solve();