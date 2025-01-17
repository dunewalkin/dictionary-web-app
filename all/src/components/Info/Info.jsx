import React, { useState, useEffect } from 'react';
import './info.scss';
import link from '../../assets/images/icon-new-window.svg';

const Info = ({ wordData, onSynonymClick, onAntnonymClick }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (wordData && wordData.phonetics) {
      const audioUrl = wordData.phonetics.find((pho) => pho.audio !== '') || null;
      setAudioUrl(audioUrl ? audioUrl.audio : null);
    }
  }, [wordData]);

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  if (!wordData) {
   // window.history.pushState({ path: '/' }, '', '/');
    return null;
  }


  return (
   <section className='info-wrapper'>
      <div className='main-info'>
         <div className="word-info">
            <h1>{wordData.word}</h1>
            <h2 className='word-phonetic'>{wordData.phonetic}</h2>
         </div>
         <div className="audio">
            <button className="audio-btn" onClick={playAudio}>
               <svg className='audio-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75"><g ><circle cx="37.5" cy="37.5" r="37.5"/><path d="M29 27v21l21-10.5z"/></g></svg>
            </button>
         </div>
      </div>

      <div className='meanings-info'>
      {wordData.meanings.map((meaning, index) => (
        <div key={index}>
         <div className='speech-container'>
            <h2>{meaning.partOfSpeech}</h2>
            <div className='speech-line'></div>
         </div>

          <h3 className='meaning-title title'>Meaning</h3>
          
         <ul>
            {meaning.definitions.map((definition, indx) => (
               <li className='meaning-item' key={indx}>
                  <div >
                     <p className='word-definition'>
                        {definition.definition}
                     </p>
                     {definition.example && <p className="word-example">{`"${definition.example}"`}</p>}
                  </div> 
               </li>
            ))}
         </ul>
          
         {meaning.synonyms && meaning.synonyms.length > 0 &&(
         <div className='synonyms-container'>
            <h3 className="title">Synonyms</h3>
            <div className="synonym-wrapper">
            {meaning.synonyms.map((synonym, i) => (
               <button key={i}
               className="synonym-item"
               onClick={() => onSynonymClick(synonym)}>
                  {synonym}
               </button>  
            ))}
            </div>
         </div>        
         )}

         {meaning.antonyms && meaning.antonyms.length > 0 &&(
         <div className='synonyms-container'>
            <h3 className="title">Antonyms</h3>
            <div className="synonym-wrapper">
            {meaning.antonyms.map((antonym, j) => (
               <button key={j}
               className='synonym-item' 
               onClick={() => onAntnonymClick(antonym)}>
                  {antonym}
               </button>
            ))}
            </div>
         </div>        
         )}
        </div>
      ))}
      </div>

      <div className="source-container">
            <h4 className='body-s source-title'>Source</h4>
            {wordData.sourceUrls && wordData.sourceUrls.length > 0 &&(
               <div className='source-links'>
               {wordData.sourceUrls.map((sourceUrl, k) => (
                  <a key={k}
                  className='body-s source-item' 
                  href={sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  > 
                  {sourceUrl}

                  <img src={link} alt="Link" />
                  </a>
                  ))}       
            </div>
            )}           
      </div>

   </section>
  )
}

export default Info

