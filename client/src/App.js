import './App.css';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './UserContext';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';
import EditPost from './pages/EditPost';


function App() {
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/create' element={<CreatePostPage />} />
            <Route path='/post/:id' element={<SinglePostPage />} />
            <Route path='/edit/:id' element={<EditPost />} />
          </Route>
      </Routes>
    </UserContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
