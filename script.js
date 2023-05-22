const selectors = {
    boardContainer : document.querySelector('.board-container'),
    board : document.querySelector('.board'),
    moves : document.querySelector('moves'),
    timer : document.querySelector('timer'),
    start : document.querySelector('button'),
    win : document.querySelector('win')
};

const state = {
    gameStarted : false,
    flippedCards : 0,
    totalFlips : 0,
    totalTime : 0,
    loop : null
};
const shuffle = array => {
    const clonedArray = [...array];

    for(let i = clonedArray.length -1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];

        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = origin;
    }
    return clonedArray;
}

const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for(let i=0; i<items; i++){
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
}
return randomPicks;
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimensio');

    if(dimension % 2 !== 0){
        throw new Error("The dimension of the board must be an even number.")
    }
    const emojis = ['🍎','🍌','🍇', '🍊','🍓','🍉','🍍','🍒','🍑','🥥']
    const picks = pickRandom(emojis, (dimensions * dimensions) /2);
    const items = shuffle ([...picks, ...picks]);
    const cards = `
      <div class="board" style="grid-template-columns: repeat(${dimensions},
        auto)">
        ${items.map(item => `
            <div class="card">
                 <div class="card-front"></div>
                 <div class="card-back">${item}</div>
        `).join('')}
        </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'))
};

