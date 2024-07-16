import React, { useState, useEffect } from 'react';

function ImageHover({ size, forceHover }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(forceHover);
  }, [forceHover]);

  const defaultImage = './src/assets/images/nanabooboo-logo-closed.png';
  const hoverImage = './src/assets/images/nanabooboo-logo-open.png';

  const handleMouseEnter = () => !forceHover && setHovered(true);
  const handleMouseLeave = () => !forceHover && setHovered(false);

  const styles = {
    position: 'relative',
    top: '0',
    left: '0',
    width: size,
    height: 'auto',
    margin: '1%',
  };

  return (
    <img
      src={hovered ? hoverImage : defaultImage}
      alt="BananaBooBoo Logo"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles}
    />
  );
}

export default ImageHover;