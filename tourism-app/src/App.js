import logo from './logo.svg';
import './App.css';
import data from './data'
import { useState } from 'react';
import Tours from './components/Tours'

function App() {

  const [tours,setTour] = useState(data);

  function removeTour(id){
    const newTour = tours.filter(tour => tour.id != id );
    setTour(newTour);
  }

  if(tours.length === 0){
    return (
      <div className='refresh'>
        <h2> No Tours Left</h2>
        <button className="btn-white" onClick={()=>setTour(data)}>
          Refresh
        </button>
      </div>
    );
  }


  return (
    <div>
      <Tours tours = {tours} removeTour = {removeTour}></Tours>
    </div>
  );
}

export default App;
