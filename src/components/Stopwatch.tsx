import { useEffect, useState } from "react";
import './Stopwatch.css';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [collectedTimes, setCollectedTimes] = useState<number[]>([]);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            const start = Date.now() - time;

            interval = setInterval(() => {
                setTime(Date.now() - start);
            }, 10);
        };

        // Clear interval
        return () => {
            if (interval != null) {
                clearInterval(interval);
            }
        };

    }, [isRunning, time]);

    useEffect(() => {
        const spacePressed = (event: KeyboardEvent) => {
            if (event.code == "Space") {
                event.preventDefault();

                if (isRunning) {
                    // Pause 
                    setIsRunning(false);

                    // Add time to collectedTimes
                    setCollectedTimes((prevTime) => [...prevTime, time]);
                }
                else if (time == 0 && !isRunning) {
                    // New solve

                    setIsRunning(true);
                }
                else if (time > 0 && !isRunning) {
                    // Reset for new solve

                    setTime(0);
                    setIsRunning(true);
                }
            }
        };

        window.addEventListener("keypress", spacePressed);

        return () => {
            window.removeEventListener("keypress", spacePressed);
        };

    }, [isRunning, time]);

    const formatTime = (timeBeingFormatted: number) => {
        const milliseconds = Math.floor(timeBeingFormatted % 1000);
        const seconds = Math.floor(timeBeingFormatted / 1000) % 60;
        const minutes = Math.floor(timeBeingFormatted / 60000) % 60;

        const millisecondsText = ("0" + milliseconds).slice(-2);
        const secondsText = ("0" + seconds).slice(-2);
        const minutesText = ("0" + minutes).slice(-2);

        return `${minutesText}:${secondsText}:${millisecondsText}`;
    }

    const getAverage = () => {
        if (collectedTimes.length == 0) {
            return 0;
        }

        const total = collectedTimes.reduce((a, b) => a + b);
        return total / collectedTimes.length;
        
    }

    return (
        <div id = "container">
            <div id = "stopwatch">
                <h1>{formatTime(time)}</h1>
            </div>  

            <div id = "times">
                <h2>Collected Times</h2>
                <ol>
                    {collectedTimes.map((collectedTime) => (
                        <li>{formatTime(collectedTime)}</li>
                    ))}
                </ol>
            </div>
            <div id = "data">
                <h3>Average: {formatTime(getAverage())}</h3>
            </div>
        </div>
    );
}

export default Stopwatch;