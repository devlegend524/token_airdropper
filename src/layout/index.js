import React from 'react';
import Header from 'components/Header';

export default function index({ children }) {
  return (
    <div className='p-1 w-screen'>
      <Header />
      {children}
    </div>
  );
}
