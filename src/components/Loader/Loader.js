import React from 'react';
import '../../assets/styles/loader.css';

export default function Loader() {
  return (
    <div className="dimmer">
      <div className="loading">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    </div>
  );
}
