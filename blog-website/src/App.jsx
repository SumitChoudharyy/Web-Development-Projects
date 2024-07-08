import { useContext, useEffect, useState } from 'react'
import './App.css'
import { AppContext } from './context/AppContext'
import { Route,Routes, useLocation, useSearchParams } from 'react-router-dom'
import Home from './Pages/Home'
import BlogPage from './Pages/BlogPage'
import TagPage from './Pages/TagPage'
import Category from './Pages/Category'

function App() {

  const{fetchBlogPosts} = useContext(AppContext);

  const [searchParams,setSearchParams] = useSearchParams();
  const location = useLocation();
  
  useEffect(()=>{
    const page = searchParams.get("page") ?? 1;
    if(location.pathname.includes("tags")){
      const tag = location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlogPosts(Number(page),tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-","");
      fetchBlogPosts(Number(page),null,category);
    }
    else{
      fetchBlogPosts(Number(page));
    }
  },[location.pathname,location.search])

  return (
    <Routes>
       <Route path='/' element={<Home></Home>}></Route>
       <Route path='/blog/:blogId' element={<BlogPage></BlogPage>}></Route>
       <Route path='/tags/:tag' element={<TagPage></TagPage>}></Route>
       <Route path='/categories/:category' element={<Category>npm</Category>}></Route>

    </Routes>
  )
}

export default App
