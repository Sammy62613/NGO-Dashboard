
//components
import AvailToggle from '../components/AvailToggle'


import Cookies from "universal-cookie";
import Restricted from "./Restricted";

import React, { useState, useEffect} from "react";
//WORKING AS INTENDED, DO NOT TOUCH THIS
function Home({loginData}) {
    const cookies = new Cookies();    
    const [NGOName, setNameIsAvailable] = useState(null);
    const [description, setDescIsAvailable] = useState(null)
    const [error, setError] = useState(null)
    const fetchingDeets = `/api/ngo/${cookies.get('userId')}`

    useEffect(() => {
        const fetchNGOName = async () => {
            const response = await fetch(fetchingDeets)
            const json = await response.json()

            if(response.ok){
                setNameIsAvailable(json.NGOName)
            }
        }
        fetchNGOName()
    },[])

    useEffect(() => {
        const fetchNGODesc = async () => {
            const response = await fetch(fetchingDeets)
            const json = await response.json()

            if(response.ok){
                setDescIsAvailable(json.description)
            }
        }
        fetchNGODesc()
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const NGO = {NGOName, description}
        const response = await fetch(fetchingDeets, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(NGO)
    })
        const json = await response.json()
        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setError(null)
            alert('NGO updated successfully')
            console.log('NGO updated successfully',json)
        }
    }

    return typeof cookies.get("authToken") != "undefined" ? (
        <div className="home">
            <div style={{ display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: '1px solid #ccc', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <div className="ngo-details"
            style={{ display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: '1px solid #ccc', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Name:</label>
                <br />
                <input 
                type="text" 
                id="name" 
                required="true" 
                defaultValue={NGOName} 
                onChange={(e)=> setNameIsAvailable(e.target.value)}
                className="text-fields"
                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }} />  
                <br />
                <label htmlFor="description" 
                style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Description:</label>
                <br />
                <textarea 
                id="description" 
                defaultValue={description}
                required="true" 
                onChange={(e) => setDescIsAvailable(e.target.value)} 
                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', minHeight: '10rem' }} />
                <br />
                <div style={{display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center'}}><button
                className="button"  style={{
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'}}>Update Details</button>
                {error && <div className="error">{error}</div>}
                </div>
                </form>  
                </div>
            <br />
            <AvailToggle/>
            </div>
        </div>
    ) : (
        <Restricted />
    );
}
export default Home