import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './Form.jsx'
import Layout from './Layout.jsx'
import PostPage from './PostPage.jsx'
import EditForm from './EditForm.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/post/:id" element={<PostPage />}/>
        <Route path="/edit/:id" element={<EditForm />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)