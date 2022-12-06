const fs = require('fs');
var _=require('lodash'); 

// inclusive of first and last
const getNumbers = (start, end) => {
    const countArr = [];
    for (let i = start; i <= end; i++) {
        countArr.push(i);
    }

    return countArr;
};

const isOverlap = (rangeAstart, rangeBstart, rangeAend, rangeBend) => {
    // if starts are teh same, return true
    // take either
    // loop over it
    // compare against first number from other
    const bNumbers = getNumbers(rangeBstart, rangeBend);

    for (let i = rangeAstart; i <= rangeAend; i++) {
        if (bNumbers.find(bn => bn === i)) {
            return true;
        }
    }

    return false;
}

try {
    const data = fs.readFileSync('./data.js', 'utf8');
    console.log('Success!');
    const split = data.split('\n');

    let counter = 0;
    split.forEach(item => {
        const [rangeAshort, rangeBshort] = item.split(',');
        
        let [rangeAstart, rangeAend] = rangeAshort.split('-');
        let [rangeBstart, rangeBend] = rangeBshort.split('-');

        rangeAstart = Number(rangeAstart);
        rangeAend = Number(rangeAend);
        rangeBstart = Number(rangeBstart);
        rangeBend = Number(rangeBend);

        const overlapped = isOverlap(rangeAstart, rangeBstart, rangeAend, rangeBend);

        if (overlapped) {
            counter++;
        }
    })

    console.log('Answer 2 is ', counter);

} catch (err) {
  console.error('Error! ', err);
}

// 28-82,28-81 true
// 36-36,35-55
// 55-90,89-89
// 9-51,1-51
// 3-98,1-2