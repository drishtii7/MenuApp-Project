import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Error from './Components/Error';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard';
import Home from './Components/Customer/Home';
import ProductInsert from './Components/Admin/ProductInsert';
import FileUpload from './Components/FileUpload';

function App() {
  return (
    <>
    {/* <FileUpload/> */}
      <BrowserRouter>
         
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<Error/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/home" element={<Home/>}/>

        </Routes>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
