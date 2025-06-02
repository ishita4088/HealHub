import { createContext } from "react";

export const AppContext= createContext()

const AppContextProvider = (props)=>{

    const currency ='₹'

    const calculateAge= (dob)=>{
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const formatDate = (slotDate) => {
        const [day, month, year] = slotDate.split('_')
        const dateObj = new Date(`${year}-${month}-${day}`)
        return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    
    const value ={
        calculateAge,formatDate,currency
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider