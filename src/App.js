import React from 'react';
import Api from './components/Api';

import LostForm from './components/LostForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import LostPage from './components/LostPage';
import FoundPage from './components/FoundPage';
import AlertPage from './components/AlertPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/found-form-map" element={<Api/>}/> 
          <Route path="/lost-form" element={<LostForm/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/found-page" element={<FoundPage/>}/> 
          <Route path="/lost-page" element={<LostPage/>}/>
          <Route path="/alert-page" element={<AlertPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
