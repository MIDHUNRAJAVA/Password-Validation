import React, { useState, useEffect } from 'react';
import './App.css';
import plant from './assets/bg.jpg';
// Debounce function to limit the rate of calling handleSubmit
const useDebounce = (value, delay) => {
    console.log(0);
    let count=0;
    const [debouncedValue, setDebouncedValue] = useState(value);
    // count= count+1;
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        console.log(1);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;  
};

const App = () => {
    console.log("Rendered");
    const [length, setLength] = useState(0);
    const [warning, setWarning] = useState([]);
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 400); // Debounce input for 300ms

    const handleSubmit = () => {
        if (debouncedInput.length === 0) {
            setWarning([]); // Clear warnings if the input is empty
            return;
        }

        const temp = [];
        // console.log(length);
        console.log(debouncedInput);
        let arr = [0, 0, 0, 0];

        if (length < 8) {
            temp.push(` YOU MUST ENTER AT LEAST 8 CHARACTERS`);

            for (let i = 0; i < debouncedInput.length; i++) {
                if (debouncedInput[i] >= 'a' && debouncedInput[i] <= 'z') ++arr[0];
                else if (debouncedInput[i] >= 'A' && debouncedInput[i] <= 'Z') ++arr[1];
                else if (debouncedInput[i] >= '0' && debouncedInput[i] <= '9') ++arr[2];
                else ++arr[3];
            }

            if (arr[0] < 3) temp.push(` Enter ${3 - arr[0]} more lowercase (a-z)`);
            if (arr[1] === 0) temp.push(' Enter at least 1 uppercase (A-Z)');
            if (arr[2] === 0) temp.push(` Enter ${3 - arr[2]} more digits (0-9)`);
            if (arr[3] === 0) temp.push(' Enter at least 1 special character (!@#$%^&*()_+-=[]{}|;:\,.<>?/)');

            setWarning(temp);
        } else {
            setWarning([]); 
        }
    };

    // Call handleSubmit when the debounced input changes
    useEffect(() => {
        handleSubmit();
    }, [debouncedInput]);

    return (
        <div className='bg-container' style={{ backgroundImage: `url(${plant})` }}>
            <div className='container'>
                <div className='heading'><h1>LOGIN</h1></div>
                <div className='input-div'>
                    <p className='username'>USERNAME:</p>
                    <input type="text" className='input-username' placeholder='Enter your Name...' required />
                    <p className='password'>PASSWORD:</p>
                   
                    <input
                        type="text"
                        className='input-password'
                        placeholder='Enter your Password'
                        onChange={(e) => {
                            const val = e.target.value;
                            setLength(val.length);
                            setInput(val); 
                        }}
                    />

                    <div className='warning'>
                        <ol>
                            {
                                warning.map((maps, index) => (
                                    <li key={index}>{maps}</li> // Render warnings correctly
                                ))
                            }
                        </ol>
                    </div>
                </div>
                <div><button type='submit' className='submit' onClick={handleSubmit}>SUBMIT</button></div>
            </div>
        </div>
    );
}

export default App;
