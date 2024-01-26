import React, { useState, useEffect, useRef } from 'react';
import './search.scss';

const Search = ({ onSearchResult, currentSynonym, currentAntonym, resetError }) => {
  const [word, setWord] = useState('');
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  const submitButtonRef = useRef(null);
  const [programmaticChange, setProgrammaticChange] = useState(false);


  useEffect(() => {
   const isRootUrl = window.location.pathname === '/';
   if (!isRootUrl) {
     const wordFromUrl = window.location.pathname.replace('/', '');
     setWord(wordFromUrl);
     handleSearch({ preventDefault: () => {} }, wordFromUrl);
   }
 }, []);

  useEffect(() => {
   if (currentSynonym !== null) {
      setWord(currentSynonym);
     handleSearch({ preventDefault: () => {} }, currentSynonym);
   }
 }, [currentSynonym]);

 useEffect(() => {
   if (currentAntonym !== null) {
      setWord(currentAntonym);
     handleSearch({ preventDefault: () => {} }, currentAntonym);
   }
 }, [currentAntonym]);

  const handleSearch = async (event, searchWord = word) => {
    event.preventDefault();

    if (!searchWord.trim()) {
      setIsEmptyQuery(true);
      return;
    }

    setIsEmptyQuery(false);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);

      if (!response.ok) {
        throw new Error(`No results for ${searchWord}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      onSearchResult(data);

      if (data && data.length > 0 && !programmaticChange) {
        const newUrl = `/${searchWord}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }

      setProgrammaticChange(false);
      document.activeElement.blur();
    } catch (error) {
      console.error('Error fetching data:', error);
      onSearchResult([]);
    }
  };

  const previousUrl = () => {
    const currentUrl = window.location.pathname;
    const wordFromUrl = currentUrl.replace('/', '');
    if (wordFromUrl !== word) {
      setWord(wordFromUrl);
      handleSearch({ preventDefault: () => {} }, wordFromUrl);
      console.log('Previous URL:', wordFromUrl);
      console.log('word:',word);
         console.log('current', currentUrl)
    }
  };

  useEffect(() => {
   const handleBeforeUnload = () => {
     localStorage.setItem('resetSearch', 'true');
   };
 
   window.addEventListener('beforeunload', handleBeforeUnload);
 
   return () => {
     window.removeEventListener('beforeunload', handleBeforeUnload);
   };
 }, []);

 useEffect(() => {
   const resetSearch = localStorage.getItem('resetSearch');
 
   if (resetSearch === 'true') {
     window.history.pushState({ path: '/' }, '', '/');
     localStorage.removeItem('resetSearch');
   }
 }, []);

  useEffect(() => {
   const handlePopState = (event) => {
     if (window.location.pathname === '/') {
       onSearchResult([]);
       setWord('');
       resetError(); 
     } else {
       setProgrammaticChange(true);
       previousUrl();
     }
   };

   window.addEventListener('popstate', handlePopState);

   return () => {
     window.removeEventListener('popstate', handlePopState);
   };
 }, [onSearchResult, resetError]);

 

  return (
    <section className='search-container'>
      <form className='search-form' onSubmit={handleSearch}>
        <input
          className={`search-input ${isEmptyQuery ? 'error-border' : ''}`}
          type="text"
          placeholder="Search for any word…"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit" className='search-btn' ref={submitButtonRef}></button>
      </form>
      {isEmptyQuery && <p className='empty-error'>Whoops, can’t be empty…</p>}
    </section>
  );
};

export default Search;
