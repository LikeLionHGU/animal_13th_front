import React from 'react';
import Camera from './Camera';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Camera/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
