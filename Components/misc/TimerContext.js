import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Creates a context for managing and accessing timer functionalities.
 */
const TimerContext = createContext();

/**
 * A custom hook for accessing the timer context. This simplifies the usage of timer context
 * in any component that requires timing functionalities.
 *
 * @returns {Object} The timer context containing the state and functions related to the timer.
 */
export const useTimer = () => useContext(TimerContext);

/**
 * Provides timer-related state and functionalities to its children, such as starting and stopping a timer.
 * This component manages a timer that increments every second when active.
 *
 * @param {Object} props - Props passed to the provider.
 * @param {React.ReactNode} props.children - Child components that will have access to the timer context.
 */
export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0); // State to keep track of the timer count in seconds.
  const [isActive, setIsActive] = useState(false); // State to manage whether the timer is running.

  useEffect(() => {
    let interval = null;
    if (isActive) {
      // Set up an interval that updates the time state every second when the timer is active.
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      // Clear the interval when the timer is not active.
      clearInterval(interval);
    }
    // Clean up the interval when the component unmounts or the timer stops.
    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
    <TimerContext.Provider value={{ time, setTime, isActive, setIsActive }}>
      {children}
    </TimerContext.Provider>
  );
}
