import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((isDark) => !isDark);
    };

    useEffect(() => {
        document.documentElement.classList.add(
            isDarkMode ? "dark-mode" : "light-mode"
        );
        document.documentElement.classList.remove(
            isDarkMode ? "light-mode" : "dark-mode"
        );
    }, [isDarkMode]);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

const useDarkMode = () => {
    const context = useContext(DarkModeContext);

    if (context === undefined) {
        throw new Error("DarkModeContext was used outside of DarkModeProvider");
    }

    return context;
};

export { DarkModeProvider, useDarkMode };
