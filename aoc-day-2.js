const fs = require('fs');

// const PLAYS = {
//     rock: ['A', 'X'],
//     paper: ['B', 'Y'],
//     scissors: ['C', 'Z'],
// };

const THEIRS = {
    A: 'A', // rock
    B: 'B', // paper
    C: 'C', // scissors
};

const OURS = {
    X: 'X', // rock
    Y: 'Y', // paper
    Z: 'Z', // scissors
};

const PLAY_SCORES = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const SCORES = {
    loss: 0,
    draw: 3,
    win: 6,
};

// rock > scissors
// scissors > paper
// paper > rock

const isWin = (t, o) => {
    // console.log('SWITCH ours is ', o === OURS.X, OURS.Y, OURS.Z);
    switch (true) {
        case o === OURS.X: // ours === rock
            return t === THEIRS.C; // theirs === scissors
        case o === OURS.Y: // ours === paper
            return t === THEIRS.A; // theirs === rock
        case o === OURS.Z: // ours === scissors
            return t === THEIRS.B; // theirs === paper
        default:
            return false;
    };
};

const isDraw = (t, o) => {
    switch (true) {
        case o === OURS.X:
            return t === THEIRS.A;
        case o === OURS.Y:
            return t === THEIRS.B;
        case o === OURS.Z:
            return t === THEIRS.C;
        default:
            return false;
    };
};

try {
    const data = fs.readFileSync('./data.js', 'utf8');
    console.log('Success!');

    const split = data.split('\n');

    // calculate score per han
    let counter = 0;
    split.forEach((item) => {
        const [theirs, ours] = item.split(/\s+/);

        const win = isWin(theirs, ours);
        const draw = isDraw(theirs, ours);

        if (win) {
            counter += SCORES.win;
        } else if (draw) {
            counter += SCORES.draw;
        } else {
            counter += SCORES.loss;
        }

        if (ours === OURS.X) {
            counter += PLAY_SCORES.rock;
        } else if (ours === OURS.Y) {
            counter += PLAY_SCORES.paper;
        } else {
            counter += PLAY_SCORES.scissors;
        }
        // console.log({ 
        //     theirs,
        //     ours,
        //     isWin: isWin(theirs, ours),
        //     isDraw: isDraw(theirs, ours),
        //     isLoss: !isWin(theirs, ours) && !isDraw(theirs, ours),
        //     counter,
        // });
    });

    console.log('Answer 1 is ', counter);
     
} catch (err) {
  console.error('Error! ', err);
}