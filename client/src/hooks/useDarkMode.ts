import { useEffect, useState } from 'react';

const useDarkMode = (): [() => void, string] => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
    ).matches;
    const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    const [theme, setTheme] = useState<string>(defaultTheme);

    useEffect(() => {
        const root = document.documentElement;
        const oppositeTheme = theme === 'light' ? 'dark' : 'light';

        root.classList.add(theme);
        root.classList.remove(oppositeTheme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    return [toggleTheme, theme];
};

export default useDarkMode;
