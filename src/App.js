import "./styles.css";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "./Wordle.css";

import { fetchRandomWord } from "./service/api";
import Complete from "./components/gameComplete";
import MyGuesses from "./components/guesses";
export default function App() {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const [guess, setGuess] = useState("");
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    if (!targetWord) {
      let word = null;
      (async () => {
        word = await fetchRandomWord();
        setTargetWord(word);
        console.log("Word: ", word);
      })();
    }
  }, [targetWord]);

  const [remainingAttempts, setRemainingAttempts] = useState(5);

  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [hintLetter, setHintLetter] = useState({ letter: "", position: -1 });

  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [hintClicks, setHintClicks] = useState(0);

  // Resetting all the useState hooks to default
  const restartGame = () => {
    setGuess("");
    setTargetWord("");
    setRemainingAttempts(5);
    setPreviousGuesses([]);
    setHintLetter({ letter: "", position: -1 });
    setCorrectGuesses([]);
    setHintClicks(0);
    setGameWon(false);
    setGameLost(false);
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuess = (event) => {
    event.preventDefault();

    if (guess.length !== 5) {
      alert("Please enter a word of length 5");
      return;
    }
    console.log("Guessed: ", guess, "target: ", targetWord);
    let x = guess.split("");
    console.log(x);

    const checkCharPosition = guess.split("").map((char, index) => {
      if (char === targetWord.charAt(index)) {
        setCorrectGuesses((prevCorrectGuesses) => [
          ...prevCorrectGuesses,
          char,
        ]);
        return "previous-guesses-table-correctPosition";
      } else if (targetWord.includes(char)) {
        return "previous-guesses-table-wrongPosition";
      } else {
        return "previous-guesses-table-missing";
      }
    });

    setPreviousGuesses([
      ...previousGuesses,
      { guessedWord: guess, boxColor: checkCharPosition },
    ]);

    if (guess === targetWord) {
      //console.log("You win");
      setGameWon(true);
    } else {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
      if (remainingAttempts === 1) {
        setGameLost(true);
      }
    }

    setGuess("");
  };

  const handleHints = (event) => {
    setRemainingAttempts((prevAttempts) => prevAttempts - 1);

    if (remainingAttempts === 1) {
      setGameLost(true);
    }
    event.preventDefault();

    for (let i = 0; i < targetWord.length; i++) {
      if (!correctGuesses.includes(targetWord.charAt(i))) {
        setHintLetter({ letter: targetWord.charAt(i), position: i + 1 });
        setHintClicks((prevClicks) => prevClicks + 1);
        break;
      }
    }
  };
  return (
    <>
      <div className="wordleStart">
        {gameWon && (
          <Complete
            status={"Congratulations! 🎉"}
            message={"You have guessed the word correctly!"}
            styleClass={"wordle-congratulations-message"}
            restartGame={restartGame}
            runConfetti={true}
          />
        )}
        {gameLost && (
          <Complete
            status={"Better Luck Next Time!"}
            message={`The correct word was: ${targetWord}`}
            styleClass={"wordle-gameLost-message"}
            restartGame={restartGame}
            runConfetti={false}
          />
        )}

        {!gameWon && !gameLost && (
          <div className="gameStart">
            <div className="wordle-game">
              <h1 className="wordle-game-h1">Wordle Game</h1>
              <p className="wordle-game-paragraph">Guess a 5-letter word:</p>
              <form className="wordle-game-wordInput" onSubmit={handleGuess}>
                <input
                  type="text"
                  id="guess"
                  onChange={handleInputChange}
                  value={guess}
                  placeholder="Enter your guess"
                  maxLength="5"
                  autoComplete="off"
                />

                <button className="wordle-game-submit-btn">✔️Check</button>

                <a className="my-anchor-element">
                  <button
                    className="wordle-game-submit-btn"
                    onClick={handleHints}
                  >
                    💡Hint
                  </button>
                </a>
                <Tooltip
                  anchorSelect=".my-anchor-element"
                  place="right"
                  className="wordle-game-tooltip"
                >
                  {hintClicks >= 1 ? (
                    <>
                      Letter '{hintLetter.letter}' is at position{" "}
                      {hintLetter.position}
                    </>
                  ) : (
                    <>Click to reveal hint</>
                  )}
                </Tooltip>
              </form>

              <p className="wordle-game-paragraph">
                Remaining attempts: {remainingAttempts}
              </p>
            </div>

            <MyGuesses previousGuesses={previousGuesses} />
          </div>
        )}
      </div>
    </>
  );
}
