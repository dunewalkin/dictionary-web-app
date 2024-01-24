import React, { useState, useEffect } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Info from './components/Info/Info';
import Error from './components/Error/Error';
import useLocalStorage from 'use-local-storage';

const App = () => {
  const [wordData, setWordData] = useState(null);
  const [hasWordData, setHasWordData] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [currentSynonym, setCurrentSynonym] = useState(null);
  const [currentAntonym, setCurrentAntonym] = useState(null);
 
  const handleToggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && savedTheme !== theme) {
      document.body.setAttribute('data-theme', JSON.parse(savedTheme));
      setTheme(JSON.parse(savedTheme));
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const resetError = () => {
   setError(null);
 };

  const handleSearchResult = async (data) => {
    try {
      if (!data || data.length === 0) {
        throw new Error('No results');
      }

      setWordData(data[0]);
      setHasWordData(true);
      setError(null);
    } catch (error) {
      setWordData(null);
      setHasWordData(false);
      setError('No Definitions Found');
    }
  };

  const handleSynonymClick = (synonym) => {
    setCurrentSynonym(synonym);
    setWordData(null);
    setError(null);
  };

  const handleAntonymClick = (antonym) => {
    setCurrentAntonym(antonym);
    setWordData(null);
    setError(null);
  };

  return (
    <main
      role="main"
      className={`main-container ${error ? 'main-error' : ''}`}
      data-theme={theme}
    >
      <Header onToggleTheme={handleToggleTheme} />
      <Search
        onSearchResult={handleSearchResult}
        onSynonymClick={handleSynonymClick}
        currentSynonym={currentSynonym}
        onAntnonymClick={handleAntonymClick}
        currentAntonym={currentAntonym}
        resetError={resetError}
      />
      {error ? (
        <Error errorMessage={error} />
      ) : (
        <Info
          wordData={wordData}
          onSynonymClick={handleSynonymClick}
          onAntnonymClick={handleAntonymClick}
        />
      )}
    </main>
  );
};

export default App;
