import { forwardRef, useImperativeHandle, useRef } from "react";
// useImperativeHandle is meant to be used with forwardRef.
// forwardRef is used to forwared refs 

const ResultModal = forwardRef(function ResultModel({result, targetTime}, ref) {

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
        <dialog ref={dialogElement} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form action="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
})

export default ResultModal;