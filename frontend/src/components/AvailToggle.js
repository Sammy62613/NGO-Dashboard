import React, { useState, useEffect} from "react";
import Cookies from "universal-cookie";

function AvailabilityToggle() {
  const cookies = new Cookies();    
  const [isAvailable, setIsAvailable] = useState(true);
  const fetchingDeets = `/api/ngo/${cookies.get('userId')}`
  useEffect(() => {
    const fetchNGO = async () => {
      const response = await fetch(fetchingDeets)
      const json = await response.json()

      if(response.ok){
        setIsAvailable(json.availability)
      }
  }
  fetchNGO()  
},[])
  const toggleAvailability = () => {
  setIsAvailable(!isAvailable);
    fetch(fetchingDeets, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({availability: isAvailable})
    })
    
  }
  return (
    <div>
               <button
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: isAvailable ? 'green' : 'red',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'}}
          onClick={toggleAvailability}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </button>
    </div>
  );
}
export default AvailabilityToggle;





