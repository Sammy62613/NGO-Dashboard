import React, { useState, useEffect} from "react";

const NGOContacts = () => {
    const [Phno, setNumberIsAvailable] = useState(null)
    const [email, setEmailIsAvailable] = useState(null)
    const [error, setError] = useState(null)
    const fetchingDeets = '/api/ngo/testing62613@email.com'
    useEffect(() => {
        const fetchNGOName = async () => {
            const response = await fetch(fetchingDeets)
            const json = await response.json()

            if(response.ok){
                setNumberIsAvailable(json.Phno)
            }
        }
        fetchNGOName()
    },[])
    useEffect(() => {
        const fetchNGODesc = async () => {
            const response = await fetch(fetchingDeets)
            const json = await response.json()

            if(response.ok){
                setEmailIsAvailable(json.email)
            }
        }
        fetchNGODesc()
    },[])
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const NGO = {Phno, email}
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
    return (
            <div className="ngo-details">
                <form onSubmit={handleSubmit}>
                <label htmlFor="contact-number" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Number:</label>
                <br />
                <input 
                type="text"
                
                id="number" 
                required="true" 
                defaultValue={Phno} 
                onChange={(e)=> setNumberIsAvailable(e.target.value)}
                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }} />  
                <br />
                <label htmlFor="contact-email" 
                style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Contact Email:</label>
                <br />
                <input
                type="email"
                id="email" 
                defaultValue={email}
                required="true" 
                onChange={(e) => setEmailIsAvailable(e.target.value)} 
                style={{ fontSize: '1.2rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.5rem', marginBottom: '1rem', }} />
                <br/>
                <button
                style={{
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                    }}>Update Details</button>
                {error && <div className="error">{error}</div>}
                </form>
                
            </div>
    )
}

export default NGOContacts