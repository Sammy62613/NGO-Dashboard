//components
import NGOContacts from '../components/NGOContact'


const NGOContact = () => {
    return (
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
            <NGOContacts/>
            </div>
        </div>
    )
}

export default NGOContact