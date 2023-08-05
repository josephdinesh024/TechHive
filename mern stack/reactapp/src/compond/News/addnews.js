import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskToServer } from '../../slice/tasksSlice'
const username = localStorage?.getItem("token")
const Addnews = () => {

  const [title,setTitle] = useState('')
  const [description,setDescription]= useState('')
  const dispatch = useDispatch();

  const addnews = (e)=>{
    e.preventDefault()
    console.log({title,description,username})
    dispatch( addTaskToServer({title,description,username}) )
  }
  return (
    <div className="mx-10 w-full max-w-sm shadow appearance-none border rounded fleft">
      <form>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
      TITLE
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
    id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
    
  </div>

    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="description">
      DESCRIPTION
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    id="description" type="text" placeholder="write your Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
    </div>
    <button className="bg-blue-500 hover:bg-yello-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type="button" onClick={(e) => addnews(e)}>
        upload
      </button>
    </form>
    </div>

  )
}

export default Addnews