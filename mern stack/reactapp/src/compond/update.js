import React from 'react'
import { Logout } from './logout';
import Addnews from './News/addnews';
import Updatenews from './News/updatenews';
import Titles from './titles';
import Usersign from './usersign';
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Userlogin from './userlogin';

export default function Routing(){
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="sigin" element={<Usersign/>} />
      <Route path="login" element={<Userlogin/>} />
      <Route path="logout" element={<Logout/>} />
      {/* <Route path="list" element={<Listnews/>} /> */}
      <Route path="addnew" element={<Addnews/>} />
      <Route path="update" element={<Updatenews/>} />
    </Routes>
    </BrowserRouter>
      </>
  );
}
