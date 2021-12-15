import React, { useState } from "react";

interface HeaderProps { //destructuring
    logo: string;
    text: string;
    appName: string; 
}

const Header: React.FC<HeaderProps> = ({logo, text, appName}) => {
   const [number, setNumber] = useState(0);

   const onIncrease = () => {
       setNumber(number + 1);
   };
   const onDecrease = () => {
       setNumber(number - 1);
   }

    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>{text}</h1>
            <h2>{number}</h2>
            <button onClick = {onIncrease}>Increment</button>
            <button onClick = {onDecrease}>Decrement</button>
            <h3>{appName}</h3>
        </header>
    )
};

export default Header;
