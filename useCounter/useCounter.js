/**Un custom hook es una simple funcion!! */

import { useState } from "react"

export const useCounter = (initialState=10) => {
    
    const [counter, setCounter] = useState(initialState);



    const increment = ( ) => {
        setCounter(counter +1);
    }

    const decrement = () => {
        setCounter(counter -1);
    }

    const reset = ()=>{
        setCounter(initialState);
    }
    // va a retornar la logica de mi contador!!
    return {
        counter, 
        increment, 
        decrement,
        reset
    }
}
