import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';


const API_KEY = 'TSMkTCNl9Cv1ytCCaRKQ3OSaL72sKxnS';
// const randomMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
// const tagMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

export default function useGif(tag) {
    
    const randomMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    const tagMemeUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

    const[gif,setGif] = useState('');
    const[loading, setLoading] = useState(false);
    
    async function fetchData(tag){
        setLoading(true);
        const {data} = await axios.get(tag ? tagMemeUrl : randomMemeUrl);
        const imageSource = data.data.images.downsized_large.url;
        setGif(imageSource);
        setLoading(false); 
    }

    useEffect( ()=>{
        fetchData('car');
    },[])   

    return {gif,loading,fetchData}

}
