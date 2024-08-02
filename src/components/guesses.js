import "../Wordle.css";
export default function MyGuesses({ previousGuesses }) {
  return (
    <div className="previous-guesses">
      <h2 style={{ textAlign: "center" }} className="previous-guesses-h2">
        Your Guesses
      </h2>
      <hr />
      <table className="previous-guesses-table">
        <tbody>
          {previousGuesses.map((guessObj, index) => (
            <tr key={index}>
              {guessObj.guessedWord.split("").map((char, charIndex) => {
                return (
                  <td key={charIndex} className={guessObj.boxColor[charIndex]}>
                    {char}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
