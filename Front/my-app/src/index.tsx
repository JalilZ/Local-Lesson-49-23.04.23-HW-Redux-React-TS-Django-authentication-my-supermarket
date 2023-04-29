import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

import Category from './Shop/Category';
import Admin from './Shop/Admin';
import Shop from './Shop/Shop';
import Intro from './Shop/Intro';
import Contact from './Shop/Contact';

import Loggin from './Access/Loggin';
import Signup from './Access/Signup';


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />}>
            <Route index element={<Loggin />} />

            <Route path="/shop" element={<Shop />}>
              <Route index element={<div style={{textAlign: 'center'}} className='code'><br/>Please choose category</div>} />
              <Route path="/shop/dairy" element={<Category CategoryName='dairy'/>} />
              <Route path="/shop/snacks" element={<Category CategoryName='snacks'/>} />
             <Route path="/shop/meats" element={<Category CategoryName='meats'/>} />
            </Route>

            <Route path="/signup" element={<Signup />}/>
            <Route path="/contact-us" element={<Contact />}/>
            <Route path="/about-us" element={<Intro />}/>
            <Route path="/admin" element={<Admin />}/>

          </Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

