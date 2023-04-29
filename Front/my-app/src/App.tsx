import React from 'react';

import './App.css';
import MyNavBar from './Shop/MyNavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      
        <MyNavBar />

        <div><Outlet/></div>
        
      
    </div>
  );
}

export default App;
