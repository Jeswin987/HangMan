import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figures';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helper/Helper';

import './App.css';

const wordCategories = {
  animals: ['Dog','Cat', 'Elephant','Giraffe','Lion','Tiger','Zebra','Kangaroo','Penguin','Dolphin'],
  fruits: ['Apple','Banana','Orange','Strawberry','Grape','Pineapple','Mango','Watermelon','Cherry','Kiwi',],
  countries: ['USA','Canada','France','Germany','Japan','Australia','Brazil','India','Mexico','Italy'],
  colors: ['red','blue','green','yellow','purple','orange','pink','brown','black','white']
  
};

function getRandomCategoryWord() {
  const categories = Object.keys(wordCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const wordsInCategory = wordCategories[randomCategory];
  const randomWord = wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];
  return { category: randomCategory, word: randomWord };
}

const { category, word } = getRandomCategoryWord();
let selectedWord = word;
let selectedCategory = category;

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
        
      }
      
    };
    
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

        const { category, word } = getRandomCategoryWord();
    selectedWord = word;
    selectedCategory = category;
    
  }
  

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
