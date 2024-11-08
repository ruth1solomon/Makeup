import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../Images/img1.jpeg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpg';
import img4 from '../Images/img4.jpeg';
import img5 from '../Images/img5.jpeg';
import img6 from '../Images/img6.jpeg';
import img7 from '../Images/img7.jpeg';
import img8 from '../Images/img8.jpeg';
import img9 from '../Images/img9.jpeg';
import img10 from '../Images/img10.jpeg';
import img11 from '../Images/img11.jpeg';
import img12 from '../Images/img12.jpeg';
import img13 from '../Images/img13.jpeg';
import img14 from '../Images/img14.jpeg';
import img15 from '../Images/img15.jpeg';
import img16 from '../Images/img16.jpeg';
import img17 from '../Images/img17.jpeg';
import img18 from '../Images/img18.jpeg';
import img19 from '../Images/img19.jpeg';
import img20 from '../Images/img20.jpeg';
import img21 from '../Images/img21.jpeg';
// Array of background images
const backgroundImages = [img1, img2, img3, img4, img5, img6,img7, img8, img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21];

// Predefined color sets for dynamic change on refresh
const colorSets = [
  { textColor: 'text-pink-300', buttonColor: 'bg-pink-500', hoverColor: 'hover:bg-pink-300' },
  { textColor: 'text-blue-300', buttonColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-300' },
  { textColor: 'text-green-300', buttonColor: 'bg-green-500', hoverColor: 'hover:bg-green-300' },
];

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [colorSet, setColorSet] = useState(colorSets[0]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // Randomly select a background image on page load
    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    setBackgroundImage(randomImage);

    // Randomly select a color set on page load
    const randomColorSet = colorSets[Math.floor(Math.random() * colorSets.length)];
    setColorSet(randomColorSet);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-black bg-opacity-60 text-white p-4 rounded-lg" style={{ fontFamily: 'Cursive, sans-serif' }}>
          Welcome to Makeup Studio
        </h1>
        <h2 className="text-4xl md:text-5xl font-light mb-10 bg-black bg-opacity-40 text-white inline-block rounded-lg px-2">
  {greeting}!
</h2>
<br/>
        {/* Book Now Button */}
        
        <Link
          to="/login"
          className={`${colorSet.buttonColor} ${colorSet.hoverColor} text-white font-bold  py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out `}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
