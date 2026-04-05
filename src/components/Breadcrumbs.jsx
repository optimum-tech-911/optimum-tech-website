import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Breadcrumbs = ({ items = [] }) => {
  const { theme } = useTheme();

  if (items.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Fil d'Ariane" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${item.to || index}`} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <ChevronRight
                  className={`h-4 w-4 ${theme === 'dark' ? 'text-white/35' : 'text-black/35'}`}
                />
              ) : null}
              {isLast ? (
                <span className={theme === 'dark' ? 'text-white/80' : 'text-black/80'}>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
