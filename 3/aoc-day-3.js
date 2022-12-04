const fs = require('fs');

const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)];
const getOverlap = (str1, str2) => (str1.match(new RegExp('[' + str2 + ']', 'g')) || [])[0];
const getPriority = letter => ALPHABET.indexOf(letter) + 1;

// a-z are 1-26
// A-Z are 27-52
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

try {
    const data = fs.readFileSync('./data.js', 'utf8');
    console.log('Success!');
    const split = data.split('\n');

    // split sprint in 2 exact halves
    // find the shared letter
    // count its priority
    
    let counter = 0;
    split.forEach((item) => {
        const ruckparts = splitAt(item.length/2, item);
        const overlap = getOverlap(ruckparts[0], ruckparts[1]);
        const priority = getPriority(overlap);
        counter += priority;
    });

    console.log('Answer 1 is ', counter);

} catch (err) {
  console.error('Error! ', err);
}