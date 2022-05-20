import {BrowserRouter ,Route , Routes} from 'react-router-dom'

import Home from './pages/Home';
import Coin from './pages/Coin';

import ContextProvider from './store/Context';

import useStyles from './app-styles';

import './main.css';


function App() {

 

  const classes = useStyles();
  return (
    <BrowserRouter>
    <ContextProvider>
        <div className={classes.app}>
          <Routes>
            <Route path='/' element={<Home/>} ></Route>
            <Route path='/coins/:id' element={<Coin/>} ></Route>
          </Routes>
        </div>
      
    </ContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
