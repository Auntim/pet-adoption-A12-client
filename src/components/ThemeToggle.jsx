// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react';
import { Button } from '@shadcn/ui/button';
const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <Button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition">
            {theme === 'light' ? '🌙' : '☀️'} {/* Toggle between light and dark icons */}
        </Button>
    );
};

export default ThemeToggle;
