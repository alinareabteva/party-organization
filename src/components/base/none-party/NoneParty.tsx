import React from 'react';
import "./NoneParty.scss"

const NoneParty = () => {
  return (
    <div className="none-party">
      <div className="image">
        <img src="src/images/none.png" alt="you don't have any party"/>
      </div>
      <div className="text">Click button bellow to create them.</div>
    </div>
  );
};

export default NoneParty;