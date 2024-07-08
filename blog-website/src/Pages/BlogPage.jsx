import React, { useState,useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BlogDetails from '../components/BlogDetails';

export default function BlogPage() {

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog,setBlog] = useState(null);
    const[relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const{setLoading,loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Error Occurs in Blogid Call");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect( () =>{
        if(blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname])


  return (
    <div className='min-w-full'>
      <Header></Header>

      <div  className='w-11/12 max-w-[550px] py-8 flex flex-col gap-y-7 mt-[60px] mb-[30px] justify-center items-center
      mx-auto'>
      <div>
        <button
        className='rounded-md border-2 px-4 py-1' 
        onClick={() => navigation(-1)}
        >
            Back
        </button>
      </div>

        {
            loading ? (<Spinner></Spinner>) :
            blog ? 
            (<div>
                <BlogDetails post = {blog}/>

                <h2 className='font-bold text-[26px] mt-6 mb-2 uppercase underline'>Related Blogs</h2>
                {
                    relatedblogs.map( (post) => (
                        <div key ={post.id}>
                            <BlogDetails post = {post}></BlogDetails>
                        </div>
                    ))
                }
            </div>) : 
            (<p>Blog Not Found</p>)
    
        }

    </div>
    </div>
  )
}
