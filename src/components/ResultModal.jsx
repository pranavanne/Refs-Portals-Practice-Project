import { forwardRef, useImperativeHandle, useRef } from "react";
// useImperativeHandle is meant to be used with forwardRef.
// forwardRef is used to forwared refs 
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ResultModel({timeRemaining, targetTime, onReset}, ref) {

    const userLost = timeRemaining <= 0;
    const formattedRemainingTime = (timeRemaining/1000).toFixed(2);
    const score = Math.round((1 - timeRemaining/ (targetTime*1000)) * 100);

    const dialogElement = useRef();
    useImperativeHandle(ref, () => {
        return {
            show() {
                dialogElement.current.showModal();
            },
            show1() {
                dialogElement.current.showModal();
            }
        };
    });

    return (
        createPortal(<dialog ref={dialogElement} className="result-modal" onClose={onReset}>
            <h2>{userLost ? "You Lost" : `Your Score: ${score}`}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form action="dialog">
                <button onClick={onReset}>Close</button>
            </form>
        </dialog>, document.getElementById('modal'))

    );
})

export default ResultModal;