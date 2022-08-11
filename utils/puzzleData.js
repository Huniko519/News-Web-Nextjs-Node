// Get the date
export const getDateF = (minusDay) => {
  const today = new Date();
  today.setDate(today.getDate() - minusDay);

  const dayName = today.toLocaleString('en-GB', { weekday: 'long', timeZone: 'Europe/London' });
  const day = today.toLocaleString('en-GB', { day: 'numeric', timeZone: 'Europe/London' });
  const month = today.toLocaleString('en-GB', { month: 'long', timeZone: 'Europe/London' });
  return `${dayName} ${day} ${month}`;
};

export const getDate = (minusDay) => {
  const today = new Date();
  today.setDate(today.getDate() - minusDay);

  const year = today.toLocaleString('en-GB', { year: 'numeric', timeZone: 'Europe/London' });
  const day = today.toLocaleString('en-GB', { day: '2-digit', timeZone: 'Europe/London' });
  const month = today.toLocaleString('en-GB', { month: '2-digit', timeZone: 'Europe/London' });
  return `${year}-${month}-${day}`.toLowerCase();
};

// Get date in Month dd, yyyy
export const getFormatedDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'Europe/London' });
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

/* eslint-disable import/prefer-default-export */
export const PuzzleData = [
  {
    type: 'sudoku-easy',
    puzzleTitle: 'Latest Sudoku Easy',
    title: 'Sudoku Easy',
    image: '/static/images/pages/puzzle/inews_puzzle_sudoku1_easy.svg',
    category: 'number-puzzles',
  },
  {
    type: 'sudoku-tough',
    puzzleTitle: 'Latest Sudoku Tough',
    title: 'Sudoku Tough',
    image: '/static/images/pages/puzzle/inews_puzzle_sudoku3_tough.svg',
    category: 'number-puzzles',
  },
  {
    type: 'mini-sudoku',
    puzzleTitle: 'Latest Mini Sudoku',
    title: 'Mini Sudoku',
    image: '/static/images/pages/puzzle/inews_puzzle_sudoku_mini.svg',
    category: 'number-puzzles',
  },
  {
    type: 'idoku',
    puzzleTitle: 'Latest iDoku',
    title: 'iDoku',
    image: '/static/images/pages/puzzle/inews_puzzle_idoku.svg',
    category: 'ifavourites',
  },
  {
    type: 'codeword',
    puzzleTitle: 'Latest Codeword',
    title: 'Codeword',
    image: '/static/images/pages/puzzle/inews_puzzle_codeword.svg',
    category: 'crosswords',
  },
  {
    type: 'five-clue',
    puzzleTitle: 'Latest Five-Clue Cryptic Crossword',
    title: 'Five-Clue Cryptic',
    image: '/static/images/pages/puzzle/inews_puzzle_crossword.svg',
    category: 'crosswords',
  },
  {
    type: 'concise',
    puzzleTitle: 'Latest Concise Crossword',
    title: 'Concise Crossword',
    image: '/static/images/pages/puzzle/inews_puzzle_cryptic.svg',
    category: 'crosswords',
  },
  {
    type: 'pieceword',
    puzzleTitle: 'Latest Pieceword',
    title: 'Pieceword',
    image: '/static/images/pages/puzzle/inews_puzzle_pieceword.svg',
    category: 'crosswords',
  },
  {
    type: 'cryptic',
    puzzleTitle: 'Latest Cryptic Crossword',
    title: 'Cryptic Crossword',
    image: '/static/images/pages/puzzle/inews_puzzle_cryptic.svg',
    category: 'crosswords',
  },
  {
    type: 'general-knowledge',
    puzzleTitle: 'Latest General Knowledge',
    title: 'General Knowledge',
    image: '/static/images/pages/puzzle/inews_puzzle_genknow.svg',
    category: 'crosswords',
  },
  {
    type: 'kriss-kross',
    puzzleTitle: 'Latest KrissKross',
    title: 'KrissKross',
    image: '/static/images/pages/puzzle/inews_puzzle_kriss-kross.svg',
    category: 'crosswords',
  },
  {
    type: 'splitwords',
    puzzleTitle: 'Latest Splitwords',
    title: 'Splitwords',
    image: '/static/images/pages/puzzle/inews_puzzle_splitword.svg',
    category: 'word-puzzles',
  },
  {
    type: 'pathfinder',
    puzzleTitle: 'Latest Pathfinder',
    title: 'Pathfinder',
    image: '/static/images/pages/puzzle/inews_puzzle_pathfinder.svg',
    category: 'word-puzzles',
  },
  {
    type: '11-lives',
    puzzleTitle: 'Latest 11 Lives',
    title: '11 Lives',
    image: '/static/images/pages/puzzle/inews_puzzle_11lives.svg',
    category: 'word-puzzles',
  },
];

PuzzleData.forEach((d) => {
  // eslint-disable-next-line no-param-reassign
  d.data = [
    {
      link: getDate(0),
    },
    {
      link: getDate(1),
    },
    {
      link: getDate(2),
    },
    {
      link: getDate(3),
    },
    {
      link: getDate(4),
    },
    {
      link: getDate(5),
    },
    {
      link: getDate(6),
    },
    {
      link: getDate(7),
    },
  ];
});

export const getPuzzleProp = (type, propName) => {
  const puzzleObject = PuzzleData.find((puzzle) => puzzle.type === type && puzzle[propName]);
  return puzzleObject ? puzzleObject[propName] : '';
};
