const fs = require('fs');

const THEIRS = {
    A: 'A', // rock
    B: 'B', // paper
    C: 'C', // scissors
};

const OURS = {
    X: 'X', // rock / lose
    Y: 'Y', // paper / draw
    Z: 'Z', // scissors / win
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

const toWin = (t, o) => {
    switch (true) {
        case t === THEIRS.A: // if theirs is rock, we need paper to win
            return OURS.Y;
        case t === THEIRS.B: // if theirs is paper, we need scissors to win
            return OURS.Z;
        case t === THEIRS.C: // if theirs is scissors, we need rock to win
            return OURS.X;
        default:
            return null;
    };
};

const toDraw = (t, o) => {
    switch (true) {
        case t === THEIRS.A:
            return OURS.X;
        case t === THEIRS.B:
            return OURS.Y;
        case t === THEIRS.C:
            return OURS.Z;
        default:
            return null;
    };
};

const toLose = (t, o) => {
    switch (true) {
        case t === THEIRS.A:
            return OURS.Z;
        case t === THEIRS.B:
            return OURS.X;
        case t === THEIRS.C:
            return OURS.Y;
        default:
            return null;
    };
};

try {
    const data = fs.readFileSync('./data.js', 'utf8');
    console.log('Success!');

    const split = data.split('\n');

    // calculate score per han
    let counter = 0;
    split.forEach((item) => {
        let thisCount = 0;
        const [theirs, ours] = item.split(/\s+/);

        const winPlay = toWin(theirs, ours);
        const drawPlay = toDraw(theirs, ours);
        const lossPlay = toLose(theirs, ours);

        let play = null;

        switch (true) {
            case ours === OURS.X: // to lose
                play = lossPlay;
                break;
            case ours === OURS.Y: // to draw
                play = drawPlay;
                break;
            case ours === OURS.Z: // to win
                play = winPlay;
                break;
            default:
                break;
        };

        // scores for the hand played
        if (play === OURS.Z) {
            counter += PLAY_SCORES.scissors;
        } else if (play === OURS.Y) {
            counter += PLAY_SCORES.paper;
        } else if (play === OURS.X) {
            counter += PLAY_SCORES.rock;
        }

        // scores for winning
        if (play === winPlay) {
            counter += SCORES.win;
        } else if (play === drawPlay) {
            counter += SCORES.draw;
        } else {
            counter += SCORES.loss;
        }
        
        // console.log({ 
        //     theirs,
        //     ours,
        //     winPlay,
        //     drawPlay,
        //     lossPlay,
        //     counter,
        //     thisCount,
        //     play,
        // });
    });

    console.log('Answer 2 is ', counter);
     
} catch (err) {
  console.error('Error! ', err);
}