import logo from './logo.svg';
import './App.css';

import Listnews from './compond/News/listnews';

import Menus from './compond/menu';
import Routing from './compond/update'

const token = localStorage?.getItem('myart');
function App() {
  return (
    <>
    <Menus/>
    <Routing/>
    <h1 className='my-10 mx-5 text-red-400 text-2xl font-bold'>Published Articles</h1>
    <Listnews/>
   
    </>
      
  );
}


export default App;
