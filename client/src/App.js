import './App.css';
import {Routes, Route} from 'react-router-dom'

import PatientForm from './components/PatientForm';
import MyPatients from './components/MyPatients';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<PatientForm />} />
        <Route path={'/my-patients'} element={<MyPatients />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                    closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
    </>
  )
}

export default App;
