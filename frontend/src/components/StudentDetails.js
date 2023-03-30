const StudentDetails = ({student}) => {
    return(
        <div className="student-details">
            <h4>{student.Name}</h4>
            <p><strong>USN: </strong>{student.USN}</p>
            <p><strong>Phone Number: </strong>{student.Phno}</p>
            <p><strong>Email: </strong>{student.Email}</p>
            <p><strong>Hours worked: </strong>{student.Email}</p>
            <p>{student.createdAt}</p>
        </div>)
}

export default StudentDetails