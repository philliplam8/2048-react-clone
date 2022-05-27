/**
 * Calculate the sum of all the 'value' property for all array items on the Board component
 * @param {Array} boardArray 
 * @returns The numeric sum of all array item values
 */
function getArrayValueTotal(boardArray) {
    let total = 0;
    for (let i = 0; i < boardArray.length; i++) {
        total += boardArray[i].value;
    }
    return total;
}

export default getArrayValueTotal;