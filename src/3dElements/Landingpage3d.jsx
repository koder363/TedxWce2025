import React, { useEffect, useRef } from 'react';
import { initThreejs } from './ThreejsElement'; // Renamed to avoid conflicts

const ThreejsElement = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure both canvasRef and containerRef are available before calling initThreejs
    if (canvasRef.current && containerRef.current) {
      initThreejs(canvasRef.current, containerRef.current);
    }
  }, []); // Empty dependency array ensures the effect only runs once

  const handleButtonClick = () => {
    const targetSection = document.querySelector('.next-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh', // Full screen height
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default ThreejsElement;
