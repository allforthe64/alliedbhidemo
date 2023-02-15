import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav className="pt-4 bg-white pb-4 shadow-md flex justify-between">
            <div className="flex">
                <div className="bhiLogo ml-2 h-[30px] w-[30px]"></div>
                <p className="ml-2 leading-loose">Allied BHI</p>
            </div>
            <ul className="flex mr-2">
                <li>
                    <Link to='/' className="leading-loose nav-link">Register Patient</Link>
                </li>
                <li className="ml-4">
                    <Link to='/my-patients' className="leading-loose nav-link">My Patients</Link>
                </li>
            </ul>
        </nav>
    )   
}

export default Nav