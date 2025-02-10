import { BrowserRouter, Routes, Route } from "react-router";
import Login from '@/pages/Login.tsx';
import Search from '@/pages/Search.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )   
}