import { useEffect, useState } from "react";

function Stopwatch() {
    // const [isPaused, setIsPaused] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            // Every sec
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } 

        // Clear interval
        return () => {
            if (interval != null) {
                clearInterval(interval);
            }
        };

    }, [isRunning]);

    return (
        <div>
            <h1>Cube Timer</h1>

            <button onClick={() => {
                setIsRunning(true);
            }}>Start</button>

            <button onClick={() => {
                setIsRunning(false);
            }}>Stop</button>

            <p>Time: {time}</p>
        </div>
    );
}

export default Stopwatch;