import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'

const changeAvailability= async (req,res) =>{
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:'Availability Changed'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const doctorList = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        } else {
            return res.json({ success: false, message: "Appointment not found" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorProfile = async(req,res)=>{
    try{

        const {docId} = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success:true,profileData})

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateDoctorProfile= async(req,res)=>{
    try {

        const {docId, fees,address} = req.body
        await doctorModel.findByIdAndUpdate(docId,{fees,address})
        res.json({success:true,message:"Profile Updated"})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





export {changeAvailability,doctorList,appointmentComplete,updateDoctorProfile,doctorProfile}