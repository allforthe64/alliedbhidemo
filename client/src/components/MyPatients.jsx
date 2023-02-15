import { useEffect, useState } from "react"
import PatientCard from "./PatientCard"

const MyPatients = () => {

    const [patients, setPatients] = useState()
    let compList = []

    useEffect(() =>  {
        fetch('/get-patients').then(res => res.json())
        .then(data => setPatients(data))
    }, [])

    if (patients !== undefined) {
        console.log(patients)

        for (const [key, value] of Object.entries(patients)) {
            compList.push(<PatientCard key={key} fName={value.fName} lName={value.lName} DOB={value.dob} gender={value.gender}/>)
        }
    }

    return (
        <div className="mt-8">
            <h1 className="font-bold text-4xl ml-2 mb-4">My Patients:</h1>
            {compList}
        </div>
    )
}

export default MyPatients