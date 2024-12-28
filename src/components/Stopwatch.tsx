import { useEffect, useState } from "react";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(0);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            setStart(Date.now() - time);

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

    }, [isRunning, start]);

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
        const milliseconds = Math.floor(time % 1000);
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000) % 60;

        const millisecondsText = ("0" + milliseconds).slice(-2);
        const secondsText = ("0" + seconds).slice(-2);
        const minutesText = ("0" + minutes).slice(-2);

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