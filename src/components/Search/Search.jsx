import React, { useState, useEffect, useRef } from 'react';
import './search.scss';

const Search = ({ onSearchResult, currentSynonym, currentAntonym, resetError }) => {
  const [word, setWord] = useState('');
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  const submitButtonRef = useRef(null);
  const [programmaticChange, setProgrammaticChange] = useState(false);

  useEffect(() => {
    if (currentSynonym !== null || currentAntonym !== null) {
      const targetWord = currentSynonym !== null ? currentSynonym : currentAntonym;
      setWord(targetWord);
      handleSearch({ preventDefault: () => {} }, targetWord);
    }
  }, [currentSynonym, currentAntonym]);

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
        const newUrl = `/info/${searchWord}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }

      // Сброс флага программного изменения
      setProgrammaticChange(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      onSearchResult([]);
      // resetError(); // Сбросим ошибку
    }
  };

  const previousUrl = () => {
    // Получаем текущий URL
    const currentUrl = window.location.pathname;
    // Получаем слово из URL
    const wordFromUrl = currentUrl.replace('/info/', '');
    // Обновляем word только если оно изменилось
    if (wordFromUrl !== word) {
      setWord(wordFromUrl);
      // Вызываем handleSearch для обновления результатов поиска
      handleSearch({ preventDefault: () => {} }, wordFromUrl);
      console.log('Previous URL:', window.location.pathname);
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
       resetError(); // Сбросим ошибку
     } else {
       // Установка флага программного изменения перед вызовом previousUrl
       setProgrammaticChange(true);
       // Вызов previousUrl
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






// import React, { useState, useEffect, useRef } from 'react';
// import './search.scss';

// const Search = ({ onSearchResult, currentSynonym, currentAntonym, resetError }) => {
//   const [word, setWord] = useState('');
//   const [isEmptyQuery, setIsEmptyQuery] = useState(false);
//   const submitButtonRef = useRef(null);

//   // Флаг, указывающий, что происходит обновление страницы
//   const isPageReloading = useRef(false);

//   useEffect(() => {
//     if (currentSynonym !== null || currentAntonym !== null) {
//       const targetWord = currentSynonym !== null ? currentSynonym : currentAntonym;
//       setWord(targetWord);
//       handleSearch({ preventDefault: () => {} }, targetWord);
//     }
//   }, [currentSynonym, currentAntonym]);

//   const handleSearch = async (event, searchWord = word) => {
//     event.preventDefault();

//     if (!searchWord.trim()) {
//       setIsEmptyQuery(true);
//       return;
//     }

//     setIsEmptyQuery(false);

//     try {
//       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);

//       if (!response.ok) {
//         throw new Error(`No results for ${searchWord}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);

//       onSearchResult(data);

//       if (data && data.length > 0) {
//         const newUrl = `/info/${searchWord}`;
//         window.history.pushState({ path: newUrl }, '', newUrl);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       onSearchResult([]);
//       // resetError(); // Сбросим ошибку
//     }
//   };

//     const previousUrl = () => {
//     // Получаем текущий URL
//     const currentUrl = window.location.pathname;
//     // Получаем слово из URL
//     const wordFromUrl = currentUrl.replace('/info/', '');
//     // Обновляем word только если оно изменилось
//     if (wordFromUrl !== word) {
//       setWord(wordFromUrl);
//       // Вызываем handleSearch для обновления результатов поиска
//       handleSearch({ preventDefault: () => {} }, wordFromUrl);
//       console.log('Previous URL:', window.location.pathname);
//     }
//   };


// useEffect(() => {
//    const handleBeforeUnload = () => {
//      localStorage.setItem('resetSearch', 'true');
//    };
 
//    window.addEventListener('beforeunload', handleBeforeUnload);
 
//    return () => {
//      window.removeEventListener('beforeunload', handleBeforeUnload);
//    };
//  }, []);

//  useEffect(() => {
//    const resetSearch = localStorage.getItem('resetSearch');
 
//    if (resetSearch === 'true') {
//      console.log('Page is reloading...');
//      // Здесь вы можете добавить код для сброса значения в url
//      setWord('');
//      localStorage.removeItem('resetSearch');
//      window.history.pushState({ path: '/' }, '', '/');
//    }
//  }, [word]); // Добавляем word в зависимости


//   return (
//     <section className='search-container'>
//       <form className='search-form' onSubmit={handleSearch}>
//         <input
//           className={`search-input ${isEmptyQuery ? 'error-border' : ''}`}
//           type="text"
//           placeholder="Search for any word…"
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//         />
//         <button type="submit" className='search-btn' ref={submitButtonRef}></button>
//       </form>
//       {isEmptyQuery && <p className='empty-error'>Whoops, can’t be empty…</p>}
//     </section>
//   );
// };

// export default Search;




// import React, { useState, useEffect, useRef } from 'react';
// import './search.scss';

// const Search = ({ onSearchResult, currentSynonym, currentAntonym, resetError }) => {
//   const [word, setWord] = useState('');
//   const [isEmptyQuery, setIsEmptyQuery] = useState(false);
//   const submitButtonRef = useRef(null);

//   useEffect(() => {
//     if (currentSynonym !== null || currentAntonym !== null) {
//       const targetWord = currentSynonym !== null ? currentSynonym : currentAntonym;
//       setWord(targetWord);
//       handleSearch({ preventDefault: () => {} }, targetWord);
//     }
//   }, [currentSynonym, currentAntonym]);

//   const previousUrl = () => {
//    const searchWord = window.location.pathname.replace('/info/', '');
//    console.log('Previous URL:', searchWord);
//    // setWord(searchWord);
//    // handleSearch({ preventDefault: () => {} }, searchWord);
//  };

//   const handleSearch = async (event, searchWord = word) => {
//     event.preventDefault();

//     if (!searchWord.trim()) {
//       setIsEmptyQuery(true);
//       return;
//     }

//     setIsEmptyQuery(false);

//     try {
//       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);

//       if (!response.ok) {
//         throw new Error(`No results for ${searchWord}`);
//       }

//       const data = await response.json();
//       console.log('API response:', data);

//       onSearchResult(data);

//       if (data && data.length > 0) {
//         const newUrl = `/info/${searchWord}`;
//         window.history.pushState({ path: newUrl }, '', newUrl);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       onSearchResult([]);
//       // resetError(); // Сбросим ошибку
//     }
//   };

//   useEffect(() => {
//    const handlePopState = (event) => {
//      if (window.location.pathname === '/') {
//        onSearchResult([]);
//        setWord('');
//        resetError(); // Сбросим ошибку
//      } else {
//        // Добавьте вызов previousUrl в этом блоке
//        previousUrl();
//      }
//    };
 
//    window.addEventListener('popstate', handlePopState);
 
//    return () => {
//      window.removeEventListener('popstate', handlePopState);
//    };
//  }, [onSearchResult, resetError]);

//   return (
//     <section className='search-container'>
//       <form className='search-form' onSubmit={handleSearch}>
//         <input
//           className={`search-input ${isEmptyQuery ? 'error-border' : ''}`}
//           type="text"
//           placeholder="Search for any word…"
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//         />
//         <button type="submit" className='search-btn' ref={submitButtonRef}></button>
//       </form>
//       {isEmptyQuery && <p className='empty-error'>Whoops, can’t be empty…</p>}
//     </section>
//   );
// };

// export default Search;
