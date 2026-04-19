import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-colors border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-gray-600" />
        ) : (
          <Sun className="w-4 h-4 text-orange-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
