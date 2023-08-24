import React, { useState, useRef } from 'react';
import '../styles/imageGenerator.css';
import default_image from '../assets/default_image.jpg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState(default_image);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (!inputRef.current.value) {
      return; // Boş giriş engelleme
    }

    try {
      const response = await fetch(
        `https://api.openai.com/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
          "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36'
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "520x520",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const data_array = data.data;
        setImage_url(data_array[0].url);
      } else {
        console.error('API error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <div className='image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url} alt="" />
        </div>
      </div>
      <div className='search-box'>
        <input type="text" ref={inputRef} className='search-input' placeholder='Search...' />
        <div className="generate-btn" onClick={imageGenerator}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator;
