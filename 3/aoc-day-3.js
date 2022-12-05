const fs = require('fs');
var _=require('lodash'); 

const getOverlap = (str1, str2) => (str1.match(new RegExp('[' + str2 + ']', 'g')) || []);
const getPriority = letter => ALPHABET.indexOf(letter) + 1;

let groupByN = (n, data) => {
    let result = [];
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
    return result;
  };

// a-z are 1-26
// A-Z are 27-52
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

try {
    const data = fs.readFileSync('./data.js', 'utf8');
    console.log('Success!');
    const split = data.split('\n');

    let prioCounter = 0;
    const groupedBy3 = groupByN(3, split);
    groupedBy3.forEach(group => {
        let overlap = getOverlap(group[0], group[1]);
        overlap = getOverlap(overlap.join(''), group[2])[0];
        const priority = getPriority(overlap);
        prioCounter += priority;
    });

    console.log('Answer 2 is ', prioCounter);

} catch (err) {
  console.error('Error! ', err);
}