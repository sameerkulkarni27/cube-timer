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
            }, 1000);
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

    return (
        <div>
            <h1>Cube Timer</h1>

            <p>Time: {time}</p>
        </div>
    );
}

export default Stopwatch;