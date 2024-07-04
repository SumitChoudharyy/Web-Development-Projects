import React, { useState } from 'react'
import Card from './Card';

const Cards = (props) => {
    let courses = props.courses;
    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);

    // returns a list of all courses received from the api response
    function getCourses() {
        if(category === "All"){
          let allCourses = [];
          Object.values(courses).forEach( (array) => {
            array.forEach((course) => {
                allCourses.push(course);
            })
        })
        return allCourses;
        } 
        else {
          // only Specific Category array  will Be pass
          return courses[category];
        }
      
    }


  return (
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
      {
        getCourses().map( (course) =>(
            <Card key={course.id} 
            course={course} 
            likedCourses ={likedCourses}
            setLikedCourses ={setLikedCourses}></Card>
        ))
       }
    </div>
    
  )
}

export default Cards;
