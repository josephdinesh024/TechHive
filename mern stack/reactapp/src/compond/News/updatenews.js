import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getUser,setSelectedTask,updateTaskInServer,deleteTaskFromServer,removeTaskFromList} from "../../slice/tasksSlice";
const Updatenews = () => {

  const {usertasks,error} = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [title,setTitle] = useState('')
  const [description,setDescription]= useState('')

  const { selectedTask } = useSelector((state) => state.tasks);
  const [publish,setPublish] = useState(false)
    useEffect(() => {
      dispatch(getUser())
    },[dispatch])

    const updateTask = (tk) => {
      setShowModal(true)
      dispatch(setSelectedTask(tk))
      
    };
  
    useEffect(() => {
      if (Object.keys(selectedTask).length !== 0) {
        setTitle(selectedTask.title);
        setDescription(selectedTask.description);
      }
    }, [selectedTask]);

    const updateSelectedTask = () => {
      const id = selectedTask._id
       dispatch(updateTaskInServer({_id:id,title,description,publish}))
      setShowModal(false)
    };

    const deleteTask = (task) => {
      console.log("delete task");
      dispatch(deleteTaskFromServer(task))
      .unwrap()
      .then(() => {
        dispatch(removeTaskFromList(task))
      })
    };

  return (
    <>
    <div className='my-10 absolute  right-10 h-16 w-sm'><a href='/addnew'className="px-4 py-2 text-red-800 bg-white rounded-md shadow hover:bg-gray-400">
      Add News
      </a></div>
    <div className='my-2 bg-blue-50 border-2 rounded-lg'>
      <h1 className='mx-10 text-2xl font-bold font-bold underline'>Your Article</h1>
    {
            usertasks && usertasks.map((tk,index) => {
              return (
                <table>
                <tr>
                  <td>
                <div className=" border-2 border-indigo-600 hover:border-dotted my-5 drop-shadow-2xl max-w-screen-md hover:max-w-screen-l rounded-lg  transition ease-in-out delay-150 bg-blue-80 hover:-translate-y-1 hover:scale-110 hover:bg-red-200 duration-300 mleft " >
            
               <div className=" text-2xl"> {tk.title}</div><br/>
                {tk.description}
                </div>
                </td>
                </tr>
                <tr >
                  <td></td>
                <td className='w-lg rounded-md bg-red-200 text-center'>
                   <button className="px-4 py-2 mx-2 text-gray-1200 bg-white rounded-md shadow hover:bg-gray-500"
                                 onClick={() => updateTask(tk)}>
                                  Edit
          </button>
          <button className="px-4 py-2 my-2 mx-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                                 onClick={() => deleteTask(tk)}>
                                  Delete
          </button>
          </td>
                </tr>
                
                </table>
            )
          }

            )
        }
      </div>
      {showModal ? (
        <>
          <div
            className=" w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Your News
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-back-400 bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
      Article TITLE
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
    id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
    
  </div>

    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" for="description">
      Article
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    id="description" type="text" placeholder="write your Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
    </div>

    </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updateSelectedTask()}
                  >
                    Save Changes
                  </button>
                  {
                    selectedTask.publish ? <p>Published</p> //setPublish(true)
                    : <div> <input type='radio' value={publish} onClick={()=>setPublish(true)}/>Not Published</div>
                  }
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          
    </>
  )
}

export default Updatenews