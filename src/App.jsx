import React, { useState, useEffect } from 'react';
import './App.css';
import plant from './assets/plant.jpg';

// Debounce function to limit the rate of calling handleSubmit
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const App = () => {
    const [length, setLength] = useState(0);
    const [warning, setWarning] = useState([]);
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 400); // Debounce input for 400ms

    const handleSubmit = () => {
        if (debouncedInput.length === 0) {
            setWarning([]); // Clear warnings if the input is empty
            return;
        }

        const temp = [];
        let arr = [0, 0, 0, 0];

        for (let i = 0; i < debouncedInput.length; i++) {
            if (debouncedInput[i] >= 'a' && debouncedInput[i] <= 'z') ++arr[0];
            else if (debouncedInput[i] >= 'A' && debouncedInput[i] <= 'Z') ++arr[1];
            else if (debouncedInput[i] >= '0' && debouncedInput[i] <= '9') ++arr[2];
            else ++arr[3];
        }

        if (length < 8) temp.push(`You must enter at least 8 characters.`);
        if (arr[0] < 3) temp.push(`Enter ${3 - arr[0]} more lowercase (a-z) characters.`);
        if (arr[1] === 0) temp.push('Enter at least 1 uppercase (A-Z) character.');
        if (arr[2] < 3) temp.push(`Enter ${3 - arr[2]} more digits (0-9).`);
        if (arr[3] === 0) temp.push('Enter at least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?/)');

        setWarning(temp);
    };

    // Call handleSubmit when the debounced input changes
    useEffect(() => {
        handleSubmit();
    }, [debouncedInput]);

    return (
        <div className="main-container">
            <div className="form-container">

                <div className="heading"><h1>Sign Up to Begin</h1></div>
                <div className="input-div">
                    <p className="username">Name:</p>
                    <input type="text" className="input-username" placeholder="Enter your name..." required />
                    <p className="email">Email address:</p>
                    <input type="email" className="input-email" placeholder="Enter your email..." required />
                    <p className="password">Password:</p>
                    <input
                        type="text"
                        className="input-password"
                        placeholder="Enter your password"
                        onChange={(e) => {
                            const val = e.target.value;
                            setLength(val.length);
                            setInput(val);
                        }}
                    />
                    {/* Conditionally render warnings */}
                    {warning.length > 0 && (
                        <div className="warning">
                            <ol>
                                {warning.map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
                <div>
                    <button type="submit" className="submit">Signup</button>
                </div>
            </div>

            {/* Right side for background image */}
            <div className="image-container">
                <div className="bg-image"></div>
            </div>
        </div>
    );
};

export default App;
