import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // needs to be outside because it will be recreated when state changes.
// note the timer variable will be shared by all components of TimerChallenge.
// so use refs instead, you can use ref to handle any kind of value.

export default function TimerChallenge({title, targetTime}) {

    const timer = useRef(); // case where value does not impact UI directly use ref.
    // this ref value is not reset on recomposition.

    const dialog = useRef();

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.show1();
    }

    function handleReset() {
        setTimeRemaining(targetTime*1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => {
                return prevTimeRemaining - 10;
            })
        }, 10)
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.show1();
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset}></ResultModal>
            <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? "s":""}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive? "Stop":"Start"} Challenge
                </button>
            </p>
            <p className={timerIsActive? "active":undefined}>
                {timerIsActive? "Time is running..." : "Timer inactive"}
            </p>
        </section>
        </>
    );
}