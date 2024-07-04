import './App.css';
import Cards from './components/Cards'
import Navbar from './components/Navbar.jsx'
import Filter from './components/Filter'
import {apiUrl,filterData} from "./data"
import { useEffect, useState } from 'react';
import {toast} from "react-toastify";
import Spinner from './components/Spinner.jsx';

function App() {

  const[courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      const res = await fetch(apiUrl);
      const output = await res.json();
      // save data into a variable
      setCourses(output.data);
    }catch(error){
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
      <div className='bg-slate-700 min-h-screen flex flex-col'>
        <div>
            <Navbar></Navbar>
        </div>

        <div>
          <div>
            <Filter filterData = {filterData}
            category ={category}
            setCategory = {setCategory}></Filter>
          </div>
          
          <div className = 'w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
            {
              loading ? (<Spinner></Spinner>) : (<Cards courses ={courses} category ={category}></Cards>)}
          </div>
        </div>
        
      </div>
  );
} 

export default App;
