import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DoctorDetails = () => {
  const { docId } = useParams()
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctors/${docId}`)
        const data = await res.json()
        setDoctor(data)
      } catch (err) {
        console.error('Error fetching doctor:', err)
      }
    }

    fetchDoctor()
  }, [docId])

  if (!doctor) return <p>Loading...</p>

  return (
    <div className='m-5 max-w-2xl p-5 border rounded-xl shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>{doctor.name}</h1>
      <img src={doctor.image} alt={doctor.name} className='w-48 h-48 object-cover rounded-xl mb-4' />
      <p><strong>Speciality:</strong> {doctor.speciality}</p>
      <p><strong>Degree:</strong> {doctor.degree}</p>
      <p><strong>Experience:</strong> {doctor.experience}</p>
      <p><strong>About:</strong> {doctor.about}</p>
      <p><strong>Available:</strong> {doctor.available ? 'Yes' : 'No'}</p>
      <p><strong>Fees:</strong> ₹{doctor.fees}</p>
      <div className='mt-4'>
        <h2 className='text-xl font-semibold'>Address</h2>
        <p>
          {doctor.address?.street}, {doctor.address?.city}, {doctor.address?.state}, {doctor.address?.pincode}
        </p>
      </div>
    </div>
  )
}

export default Doctorofile
