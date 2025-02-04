import React from 'react';
import MapApi from './components/MapApi';

import LostForm from './components/LostForm';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import LostPage from './components/LostPage';
import FoundPage from './components/FoundPage';
import AlertPage from './components/AlertPage';
import FoundForm from './components/FoundForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/found-form-map" element={<MapApi/>}/> 
          <Route path="/found-form" element={<FoundForm/>}/> 
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
