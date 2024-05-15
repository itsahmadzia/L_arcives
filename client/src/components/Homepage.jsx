import React, { useState, useEffect } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
const Homepage = () => {
  const [typedText, setTypedText] = useState('');
  const textToType = "Welcome from L I am alive ...";

  useEffect(() => {
    const typeText = () => {
      for (let i = 0; i <= textToType.length; i++) {
        setTimeout(() => {
          setTypedText(textToType.slice(0, i));
        }, i * 200); 
      }
    };

    typeText();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center dark:bg-black dark:text-white">
      <div className="text-5xl font-bold mb-4">{typedText}</div>
      <div className="text-xl mb-8">The world's greatest detective</div>
      <div className="text-lg mb-4">
        Random Information:
        <ul className="list-disc ml-6">
          <li>L's real name is L Lawliet.</li>
          <li>He is a master detective and has solved countless difficult cases.</li>
          <li>L loves sweets, particularly cakes and strawberries.</li>
          <li>He often sits in a crouching position.</li>
          <li>L is known for his peculiar and eccentric behavior.</li>
        </ul>
      </div>
      <Link to="/search">
     
      <div className="flex items-center mt-4 animate-bounce">
        <HiOutlineUserCircle className="text-4xl mr-2 animate-pulse" />
        <span className="text-lg">View Posts</span>
      </div> </Link>
    </div>
  );
};

export default Homepage;
