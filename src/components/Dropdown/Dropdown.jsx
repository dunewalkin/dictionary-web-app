import React, { useState, useRef, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import '../../components/Dropdown/dropdown.scss';

const fontOptions = [
  { name: 'Sans Serif', value: 'Inter, sans-serif', class: 'sans-serif' },
  { name: 'Serif', value: 'Lora, serif', class: 'serif' }, 
  { name: 'Mono', value: 'Inconsolata, monospace', class: 'monospace' }
];

const Dropdown = () => {
  const [isFlipped, setFlipped] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useLocalStorage('selectedFont', fontOptions[0].value);
  const dropdownRef = useRef(null);

  const dropMode = (font) => {
    setFlipped(!isFlipped);
    setDropdownOpen(!isDropdownOpen);
    applyFontFamily(font);
    setSelectedFont(font.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFlipped(false);
      setDropdownOpen(false);
    }
  };

  const applyFontFamily = (font) => {
    document.body.style.fontFamily = font.value;
  };

  useEffect(() => {
    applyFontFamily({ value: selectedFont }); 
  }, [selectedFont]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='dropdown-container' ref={dropdownRef}>
      <button className={`drop-btn ${isFlipped ? 'flipped' : ''}`} onClick={() => dropMode(fontOptions.find(option => option.value === selectedFont))}>
        {fontOptions.find(option => option.value === selectedFont)?.name || fontOptions[0].name}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          {fontOptions.map((font) => (
            <button key={font.name} onClick={() => dropMode(font)} className={`font-btn ${font.class}`}>
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
