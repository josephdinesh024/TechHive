
import React, { useState,useEffect } from "react";

import {useDispatch,useSelector} from 'react-redux'
import { getUserFromServer } from "../slice/userslice";
const token = localStorage?.getItem("token");

const AddTask = () => {

    const dispatch = useDispatch()
    // const {u} = useSelector((state)=>state.users)
    // const [title,setTitle] = useState('')
    // const [description,setDescription] = useState('')

    const {UserList,error} = useSelector((state) => state.users)

    useEffect(() => {
      dispatch(getUserFromServer())
    },[dispatch])

    // const addTask = (e) => {
    //     e.preventDefault()
    //     console.log({title,description})
    //     dispatch(addUsertolist({title,description}))
    //     setTitle('')
    //     setDescription('')
    // }
  return (
    <section className="my-5">
      {token}
      {/* <p>heloo{ ' dsd ${ u.length } '}</p> */}
      <div>
        {
          (error !== "") ? <h5>{error}</h5> : null
        }
        <table>
          {
            UserList && UserList.map((tk,index) => {
              return (
                <ol className="rounded-lg text-center transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 " key={tk._id}>
                
                <li>{tk.username}</li>
                <li>{tk.name}</li>
                </ol>
            )
          }
            )
        }
        </table>
      </div>
    </section>
  );
};

export default AddTask;
