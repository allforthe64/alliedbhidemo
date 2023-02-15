import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import InfoCard from './InfoCard'

const PatientForm = () => {

    const currentDay = new Date()

    //initialize state
    const [index, setIndex] = useState(0)
    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [iName, setiName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [DOB, setDOB] = useState()
    const [sex, setSex] = useState('')
    const [gender, setGender] = useState('')
    const [mStatus, setmStatus] = useState('')
    const [language, setLanguage] = useState('')

    const propList = {
        "Patient First Name:": fName,
        "Patient Last Name:": lName,
        "Patient Informal Name:": iName,
        "Patient Phone Number:": phone,
        "Patient Email:": email,
        "Patient DOB:": DOB,
        "Patient Sex At Birth:": sex,
        "Patient Gender Indentity:": gender,
        "Patient Marital Status:": mStatus,
        "Patient Language:": language
    }

    let compList = []
    
    if (index === 2) {
        for (const [key, value] of Object.entries(propList)) {
            compList.push(<InfoCard key={key} title={key} data={value} />)
        }
    }

    //define handlechange function
    const handleChangefName = (e) => {
        setfName(e.target.value)
    } 
    const handleChangelName = (e) => {
        setlName(e.target.value)
    } 
    const handleChangeiName = (e) => {
        setiName(e.target.value)
    } 
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    } 
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    } 
    const handleChangeDOB = (e) => {
        setDOB(e.target.value)
    }
    const handleChangeSex = (e) => {
        setSex(e.target.value)
    }
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }
    const handleChangemStatus = (e) => {
        setmStatus(e.target.value)
    }
    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value)
    }

    const submitFunc = () => {
        fetch('/create-patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'fName': fName,
                'lName': lName,
                'iName': iName,
                'phone': phone,
                'email': email,
                'DOB': DOB,
                'sex': sex,
                'gender': gender,
                'mStatus': mStatus,
                'language': language
            })
        })
    }

    //adjust index
    const adjIndex = (dir) => {
        if (dir === 'forward') {
            if (index === 0) {

                //validate data
                if (fName === '' || lName === '' || iName === '' || phone === '' || email === '') {
                    toast.error(fName === '' ? 'Please enter patient first name' 
                                : lName === '' ? 'Please enter patient last name' : iName === '' ? 'Please enter patient informal name' :
                                phone === '' ? 'Please enter patient phone number' : 'Please enter patient email')
                    return
                } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) !== true) {
                    toast.error('Please enter a valid email address')
                    return
                }

            } else if (index === 1) {
                //validate data
                if (DOB === undefined || sex === '' || sex === 'Select One' || gender === '' || gender === 'Select One' 
                    || mStatus === '' ||  mStatus === 'Select One' || mStatus === 'Select One' || language === '' || language === 'Select One') {
                    toast.error(DOB === undefined ? 'Please enter patient DOB' 
                                : sex === '' ? 'Please enter patient sex at birth' : sex === 'Select One' ? 'Please enter patient sex at birth' : 
                                gender === '' ? 'Please enter patient gender indentity' : gender === 'Select One' ? 'Please enter patient gender indentity' :
                                mStatus === '' ? 'Please enter patient marital status'  : mStatus === 'Select One' ? 'Please enter patient marital status' :
                                'Please enter patient primary language')
                    return
                } 
            }
            setIndex(prevIndex => prevIndex += 1)
            if (index === 2) {
                submitFunc()
            }
        } else {
            setIndex(prevIndex => prevIndex -= 1)
        }
    }

    const content = [
        <form className="border-2 w-11/12 ml-8 mt-4 pt-6 pb-6 rounded-lg bg-white">
            <div>
                <div className="flex justify-around">
                    <div className="w-5/12">
                        <p className="mb-2">Patient First Name:</p>
                        <input type={'text'} className='border rounded w-[100%] pl-4 py-2 text-lg' onChange={handleChangefName} value={fName !== '' ? fName : ''}/>
                    </div>
                    <div className="w-5/12">
                        <p className="mb-2">Patient Last Name:</p>
                        <input type={'text'} className='border rounded w-[100%] pl-4 py-2 text-lg' onChange={handleChangelName} value={lName !== '' ? lName : ''}/>
                    </div>
                </div>
                <div className="w-11/12 ml-6 mt-4">
                    <p className="mb-2">Patient Informal Name:</p>
                    <input type={'text'} className='border rounded w-[100%] pl-4 py-2 text-lg' onChange={handleChangeiName} value={iName !== '' ? iName : ''}/>
                </div>
                <div className="w-5/12 ml-6 mt-4">
                    <p className="mb-2">Patient Phone Number:</p>
                    <input type={'text'} className='border rounded w-[100%] pl-4 py-2 text-lg' onChange={handleChangePhone} value={phone !== '' ? phone : ''}/>
                </div>
                <div className="w-11/12 ml-6 mt-4">
                    <p className="mb-2">Patient Email:</p>
                    <input type={'text'} className='border rounded w-[100%] pl-4 py-2 text-lg' onChange={handleChangeEmail} value={email !== '' ? email : ''}/>
                </div>
            </div>
        </form>,

        <form className='border-2 w-11/12 ml-8 mt-4 pt-6 pb-6 rounded-lg bg-white'>
            <div>
                <div className="mt-4 ml-6 w-11/12">
                    <p className='mb-2'>Enter Patient's DOB:</p>
                    <input type={'date'} min='1920-01-01' max={currentDay} className='border w-[100%] pl-2 py-2 text-lg rounded' onChange={handleChangeDOB} value={DOB !== '' ? DOB : undefined}/>
                </div>
                <div className="mt-4 ml-6 w-11/12">
                    <p className='mb-2'>Patient Sex At Birth:</p>
                    <select className='border w-[100%] pl-2 py-2 text-lg rounded' onChange={handleChangeSex} value={sex !== '' ? sex : ''}>
                        <option>Select One</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="mt-4 ml-6 w-11/12">
                    <p className='mb-2'>Patient Gender Identity:</p>
                    <select className='border w-[100%] pl-2 py-2 text-lg rounded' onChange={handleChangeGender} value={gender !== '' ? gender : ''}>
                        <option>Select One</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="mt-4 ml-6 w-11/12">
                    <p className='mb-2'>Patient Marital Status:</p>
                    <select className='border w-[100%] pl-2 py-2 text-lg rounded' onChange={handleChangemStatus} value={mStatus !== '' ? mStatus : ''}>
                        <option>Select One</option>
                        <option>Single (Never Married)</option>
                        <option>Married</option>
                        <option>Legally Separated</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                    </select>
                </div>
                <div className="mt-4 ml-6 w-11/12">
                    <p className='mb-2'>Patient Primary Language:</p>
                    <select className='border w-[100%] pl-2 py-2 text-lg rounded' onChange={handleChangeLanguage} value={language !== '' ? language : ''}>
                        <option>Select One</option>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Chinese (Mandarin, Canotnese, Other)</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
        </form>,

        <div className='border-2 w-11/12 ml-8 mt-4 pt-8 pb-6 rounded-lg bg-white'>
            {compList}
        </div>,

        <div className='border-2 w-11/12 ml-8 mt-8 pt-8 pb-6 rounded-lg bg-white'>
            <p className='text-center font-medium mb-10'>New Patient Successfully Created.</p>
            <div className='flex justify-center'>
                <Link to='/my-patients' className='ml-2 border-2 bg-purple text-white py-2 px-4 rounded-md'>View Your Patients</Link>
            </div>
        </div>

    ]

    return (
        <>
            <h1 className="font-bold text-4xl ml-4 mt-6">Register a new patient:</h1>
            <div className={index === 3 ? 'hidden' : 'block flex justify-around w-6/12 ml-6 mt-4'}>
                <p className={index === 0 ? 'font-bold purple' : ''}>1. Basic Info</p>
                <p className={index === 1 ? 'font-bold purple' : ''}>2. Demographic Info</p>
                <p className={index === 2 ? 'font-bold purple' : ''}>3. Confirm</p>
            </div>
            {content[index]}
            <div className='ml-8 mt-4 mb-10'>
                <button className={index > 0 && index !== 3 ? 'border purple-border py-2 px-4 bg-white rounded-md' : 'border border-black py-2 px-4 bg-grey rounded-md opacity-40'} onClick={() => adjIndex('backward')} disabled={index === 0 || index === 3 ? true : false}>Back</button>
                <button className={index !== 3 ? 'ml-2 border-2 bg-purple text-white py-2 px-4 rounded-md' : 'ml-2 border-2 bg-purple text-white py-2 px-4 rounded-md opacity-40'} onClick={() => adjIndex('forward')} disabled={index === 3 ? true : false}>{index <= 1 ? 'Next' : 'Submit'}</button>
            </div>
        </>
    )
}

export default PatientForm