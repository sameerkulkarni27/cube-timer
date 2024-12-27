import { useEffect, useState } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            // Every sec
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1);
        };

        // Clear interval
        return () => {
            if (interval != null) {
                clearInterval(interval);
            }
        };

    }, [isRunning]);

    useEffect(() => {
        const spacePressed = (event: KeyboardEvent) => {
            if (event.code == "Space") {
                event.preventDefault();

                if (isRunning) {
                    // Pause 

                    setIsRunning(false);
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

    const formatTime = () => {
        const milliseconds = time % 1000;
        const seconds = Math.floor(time / 1000);
        const minutes = Math.floor(seconds / 60);

        const millisecondsText = (milliseconds / 10) < 10 ? `0${Math.floor(milliseconds / 10)}` : `${Math.floor(milliseconds / 10)}`;
        const secondsText = (seconds % 60) < 10 ? `0${seconds % 60}` : `${seconds % 60}`;
        const minutesText = minutes;

        return `${minutesText}:${secondsText}:${millisecondsText}`;
    }

    return (
        <div>
            <h1>Cube Timer</h1>

            <p>Time: {formatTime()}</p>
        </div>
    );
}

export default Stopwatch;