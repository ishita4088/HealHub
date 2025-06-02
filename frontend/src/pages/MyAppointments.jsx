import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Function to fetch user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Function to cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Fetch appointments when the token changes
  useEffect(() => {
    if (token) {
      getUserAppointments()
    } else {
      setLoading(false)
    }
  }, [token])

  // Helper function to format date
  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    const dateObj = new Date(`${year}-${month}-${day}`)
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  // Function to check if appointment can be canceled (more than 2 hours left)
  const canCancelAppointment = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split('_')
    const dateStr = `${month}/${day}/${year} ${slotTime}`  // MM/DD/YYYY format

    const appointmentDateTime = new Date(dateStr)
    const now = new Date()

    const diffMs = appointmentDateTime - now
    const diffHours = diffMs / (1000 * 60 * 60)

    return diffHours >= 2
  }

  if (loading) {
    return <div>Loading...</div>  // Show loading spinner or text
  }

  if (appointments.length === 0) {
    return <div>No appointments found.</div>  // Show when no appointments are found
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData?.image || '/default-image.jpg'} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData?.name}</p>
              <p>{item.docData?.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData?.address?.line1}</p>
              <p className='text-xs'>{item.docData?.address?.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{' '}
                {formatDate(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              {/* Show Cancel Button only if cancellation is allowed */}
              {!item.cancelled && !item.isCompleted && canCancelAppointment(item.slotDate, item.slotTime) && (
                <button
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>
              )}

              {/* Show message if cancellation not allowed */}
              {!item.cancelled && !item.isCompleted && !canCancelAppointment(item.slotDate, item.slotTime) && (
                <p className='text-xs text-red-500'>Cannot cancel within 2 hours of appointment</p>
              )}

              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
