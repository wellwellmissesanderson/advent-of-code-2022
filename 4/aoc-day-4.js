const fs = require('fs');
var _=require('lodash'); 

// inclusive of first and last
const getNumCount = (start, end) => {
    let count = 0;
    for (let i = start; i <= end; i++) {
        count++;
    }

    return count;
};

const isEncased = (rangeAstart, rangeBstart, rangeAend, rangeBend) => {
    // get counts of each
    const aCount = getNumCount(rangeAstart, rangeAend);
    const bCount = getNumCount(rangeBstart, rangeBend);

    // console.log({ aCount, bCount });

    // if they're equal, and they're not the same, not encased
    if (aCount === bCount) {
        // if they are the same, return true
        // console.log('returning ', rangeAstart === rangeBstart);
        return rangeAstart === rangeBstart;
    } 

    


    // one is longer than the other. start with one with lower first count
    const getIsAstart = () => {
        // if they have the same start, take the larger one
        if (rangeAstart === rangeBstart) {
            return aCount > bCount;
        }

        return rangeAstart < rangeBstart;
    };

    const aStart = getIsAstart();

    const startAt = aStart ? rangeAstart : rangeBstart;
    const endAt = aStart ? rangeAend : rangeBend;

    console.log({
        aStart,
        startAt,
        endAt,
    });

    // at this point they're not equal lengths and
    // don't start together

    let triggerInner = false;
    for (let i = Number(startAt); i <= endAt; i++) {
        // start with lower number. 
        // increment by one.
        // console.log({ i });

        // is aStart
            // if we hit B start, start counter
                // if we hit B end before end of loop, return true
        if (aStart) {
            if (i === rangeBstart) {
                triggerInner = true;
            }

            if (i === rangeBend && triggerInner) {
                return true;
            }
        } else {
        // is bStart
            // if we hit A start, start counter
                // if we hit A end before end of loop, return true
                if (i === rangeAstart) {
                    triggerInner = true;
                }
                
                console.log({ triggerInner, rangeAend, i });
            if (i === rangeAend && triggerInner) {
                return true;
            }
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

        const encased = isEncased(rangeAstart, rangeBstart, rangeAend, rangeBend);

        if (encased) {
            counter++;
        }

        console.log({
            item,
            rangeAshort,
            rangeBshort,
            rangeAstart,
            rangeAend,
            rangeBstart,
            rangeBend,
            encased,
        });
    })

    console.log('Answer 1 is ', counter);

} catch (err) {
  console.error('Error! ', err);
}

// 28-82,28-81 true
// 36-36,35-55
// 55-90,89-89
// 9-51,1-51
// 3-98,1-2