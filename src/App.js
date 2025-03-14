import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout"; // 공통 레이아웃 적용
import LostForm from "./components/Forms/LostForm";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import LostPage from "./components/LostPage";
import FoundPage from "./components/FoundPage";
import AlertPage from "./components/AlertPage";
import FoundForm from "./components/Forms/FoundForm";
import MyPageFound from "./components/MyPageFound";
import MyPageLost from "./components/MyPageLost";
import FoundDetail from "./components/FoundPageDetail";
import LostDetail from "./components/LostPageDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/found-form" element={<FoundForm />} />
          <Route path="/lost-form" element={<LostForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage-lost" element={<MyPageLost />} />
          <Route path="/mypage-found" element={<MyPageFound />} />
          <Route path="/found-page" element={<FoundPage />} />
          <Route path="/lost-page" element={<LostPage />} />
          <Route path="/alert-page" element={<AlertPage />} />
          <Route path="/found-detail/:id" element={<FoundDetail/>}/>
          <Route path="/lost-detail/:id" element={<LostDetail/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;