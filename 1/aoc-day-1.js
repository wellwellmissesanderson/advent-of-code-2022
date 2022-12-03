const fs = require('fs');

try {
  const data = fs.readFileSync('./data.js', 'utf8');
  console.log('Success!');

    const split = data.split('\n');
    const groups = [];
    let count = 0;

    let groupedIndex = groups.length;
    split.forEach(item => {
        if (item === '') {
            groupedIndex++;
            count = 0;
        } else {
            if (Array.isArray(groups[groupedIndex]?.items)) {
                groups[groupedIndex].items = [...groups[groupedIndex].items, item];
                groups[groupedIndex].count = groups[groupedIndex].count + Number(item);
            } else {
                groups[groupedIndex] = {
                    items: [item],
                    count: Number(item),
                };
            }
        }
    });

    // console.log(groups);
    groups.sort((a, b) => {  
        // console.log({ a, b});
        return b.count - a.count;
    });
    
    let topThreeTotal = 0;
    for (i=0; i<=2; i++) {
        topThreeTotal += groups[i].count;
    }
    console.log(groups, topThreeTotal);
    
    // answer 1 is groups[0].count
    // answer 2 is (groups[0].count + groups[1].count + groups[2].count)

} catch (err) {
  console.error('Error! ', err);
}