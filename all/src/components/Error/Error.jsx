import React from 'react';
import './error.scss';

const Error = ({ errorMessage }) => {
  return (
    <section className='error-container'>
      <div className='error-wrapper'>
         <h1 className='emoji-error'>😕</h1>
         <h3 className='error-title'>{errorMessage}</h3>
         <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead.</p>
      </div>
    </section>
  );
}

export default Error;
