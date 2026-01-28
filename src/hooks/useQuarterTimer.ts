import { useState, useEffect } from 'react';

interface Timer {
    minute: number;
    second: number;
    isRunning: boolean;
}

export const useQuarterTimer = () => {
    const [timer, setTimer] = useState<Timer>({
        minute: 10,
        second: 0,
        isRunning: false,
    });

    useEffect(() => {
        if (!timer.isRunning) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                let newSecond = prev.second - 1;
                let newMinute = prev.minute;

                if (newSecond < 0) {
                    newSecond = 59;
                    newMinute = prev.minute - 1;
                }

                if (newMinute < 0) {
                    clearInterval(interval);
                    return { minute: 0, second: 0, isRunning: false };
                }

                return { minute: newMinute, second: newSecond, isRunning: true };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer.isRunning]);

    const toggleTimer = () => {
        setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    };

    const resetTimer = () => {
        setTimer({ minute: 10, second: 0, isRunning: false });
    };

    const setTimeManually = (minute: number, second: number) => {
        setTimer((prev) => ({
            ...prev,
            minute: Math.max(0, Math.min(10, minute)),
            second: Math.max(0, Math.min(59, second)),
        }));
    };

    return { timer, toggleTimer, resetTimer, setTimeManually };
};
