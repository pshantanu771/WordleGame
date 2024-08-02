import "../Wordle.css";
export default function NewGame({ handleGuess, handleInputChange }) {
  return (
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

        <button className="wordle-game-submit-btn">Check</button>

        <a className="my-anchor-element">
          <button className="wordle-game-submit-btn" onClick={handleHints}>
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
              Letter '{hintLetter.letter}' is at position {hintLetter.position}
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
  );
}
