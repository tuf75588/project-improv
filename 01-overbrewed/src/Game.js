import { useEffect, useState } from 'react';

const backgroundSound = new Audio(
  'https://freesound.org/data/previews/423/423689_3589115-hq.mp3'
);
backgroundSound.loop = true;
backgroundSound.volume = 0.5;

const wrongSound = new Audio(
  'https://freesound.org/data/previews/278/278164_5324223-hq.mp3'
);
const gameOverSound = new Audio(
  'https://freesound.org/data/previews/382/382310_5421751-hq.mp3'
);
const orderReadySound = new Audio(
  'https://freesound.org/data/previews/149/149269_1083532-hq.mp3'
);

const ingredients = [
  {
    name: 'Coffee',
    background: '#8D5B4C',
  },
  {
    name: 'Espresso',
    background: '#0D0C1D',
  },
  {
    name: 'Water',
    background: '#C2D6EB',
  },
  {
    name: 'Ice',
    background: '#6699CC',
  },
  {
    name: 'Milk',
    background: '#D8BFAA',
  },
  {
    name: 'Foam',
    background: '#F2D0A4',
  },
  {
    name: 'Sugar',
    background: '#FAFAFF',
  },
  {
    name: 'Mud',
    background: '#99582A',
  },
];

function getRandomOrder() {
  const order = [];
  let numberOfIngredients = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numberOfIngredients; i++) {
    const randomIngredient =
      ingredients[Math.floor(Math.random() * ingredients.length)];
    order.push({
      ...randomIngredient,
    });
  }
  return order;
}

function Game() {
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [gameEnd, setGameEnd] = useState(new Date());
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [badRecipe, setBadRecipe] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    name: 'NO ORDER YET',
  });
  const [selectedIngredient, setSelectedIngredient] = useState(-1);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  useEffect(() => {
    const listener = (event) => {
      if (!started || gameOver) {
        if (event.key === ' ') {
          backgroundSound.play();
          setScore(0);
          setGameOver(false);
          setStarted(true);
          setSelectedIngredient(0);
          setCurrentOrder(getRandomOrder());
          setGameEnd(Date.now() + 62 * 1000);
          setSecondsLeft(62);
        }
      }
      if (started) {
        if (event.key === 'ArrowRight') {
          setSelectedIngredient((prevValue) => {
            const nextIndex = prevValue + 1;
            return nextIndex >= ingredients.length ? 0 : nextIndex;
          });
        } else if (event.key === 'ArrowLeft') {
          setSelectedIngredient((prevValue) => {
            const nextIndex = prevValue - 1;
            return nextIndex < 0 ? ingredients.length - 1 : nextIndex;
          });
        } else if (event.key === 'Enter') {
          setCurrentIngredients((prevValue) => [
            ...prevValue,
            {
              id: Date.now(),
              ...ingredients[selectedIngredient],
            },
          ]);
        }
      }
    };
    if (!badRecipe) {
      document.addEventListener('keydown', listener);
    }
    // for when the component unmounts
    return () => document.removeEventListener('keydown', listener);
  }, [gameOver, started, badRecipe, selectedIngredient]);

  return <div>let the game begin!</div>;
}

export default Game;
