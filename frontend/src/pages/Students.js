import { useEffect, useState } from "react"

// components
import StudentDetails from "../components/StudentDetails"

const Students = () => {
  const [students, setStudents] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/student')
      const json = await response.json()

      if (response.ok) {
        setStudents(json)
      }
    }

    fetchStudents()
  }, [])

  return (
    <div className="home">
      <div className="students">
        {students && students.map((student) => (
          <StudentDetails  key={student._id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default Students