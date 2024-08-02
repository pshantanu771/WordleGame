import RestartButton from "../restart";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "../Wordle.css";
export default function Complete({
  status,
  message,
  styleClass,
  restartGame,
  runConfetti,
}) {
  const { width, height } = useWindowSize();
  return (
    <>
      <div className={styleClass}>
        <h1>{status}</h1>
        <p>{message}</p>
        <RestartButton onClick={restartGame} />
      </div>
      {runConfetti && <Confetti width={width} height={height} run={true} />}
    </>
  );
}
