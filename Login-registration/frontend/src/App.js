import logo from './logo.svg';
import './App.css';
import {Router, Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<h1>hello I am index page</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>      
    </div>
  );
}

export default App;
