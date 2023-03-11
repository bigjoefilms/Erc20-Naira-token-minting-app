import React from 'react';
import { FaTimes } from 'react-icons/fa';

const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <FaTimes />
    </button>
  );
}

export default CloseButton;