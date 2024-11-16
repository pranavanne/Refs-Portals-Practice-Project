import { useState, useRef } from "react";

export default function Player() {

  const [playerName, setPlayerName] = useState("");

  const nameInputField = useRef();

  function handleClick() {
    setPlayerName(nameInputField.current.value);
    nameInputField.current.value = "";
  }
  
  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : "Unknown Player"}</h2>
      <p>
        <input ref={nameInputField} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
