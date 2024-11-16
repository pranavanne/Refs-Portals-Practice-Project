import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // needs to be outside because it will be recreated when state changes.
// note the timer variable will be shared by all components of TimerChallenge.
// so use refs instead, you can use ref to handle any kind of value.

export default function TimerChallenge({title, targetTime}) {

    const timer = useRef(); // case where value does not impact UI directly use ref.
    // this ref value is not reset on recomposition.

    const dialog = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart() {
        setTimerStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.show1();
            setTimerStarted(false);
        }, targetTime*1000)
    }

    function handleStop() {
        setTimerStarted(false)
        clearTimeout(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost"></ResultModal>
            <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You Lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? "s":""}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted? "Stop":"Start"} Challenge
                </button>
            </p>
            <p className={timerStarted? "active":undefined}>
                {timerStarted? "Time is running..." : "Timer inactive"}
            </p>
        </section>
        </>
    );
}