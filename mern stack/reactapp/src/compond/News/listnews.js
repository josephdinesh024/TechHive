import React,{useEffect} from 'react'

import { getTasksFromServer } from '../../slice/tasksSlice'
import { useDispatch,useSelector} from 'react-redux'


const Listnews = () => {

    const dispatch = useDispatch()
    const {tasksList,error} = useSelector((state) => state.tasks)

    useEffect(() => {
      dispatch(getTasksFromServer())
    },[dispatch])

  return (
    <section className="my-5">
    <div>
      {
        (error !== "") ? <h5>{error}</h5> : null
      }
      <table>
        {
          tasksList && tasksList.map((tk) => {
            return (
              <div className=''>
              <div className=" border-solid border-2 border-indigo-600 hover:border-dotted my-10 drop-shadow-2xl max-w-screen-md hover:max-w-screen-lg rounded-lg text-center transition ease-in-out delay-150 bg-blue-80 hover:-translate-y-1 hover:scale-110 hover:bg-red-200 duration-300 mleft " key={tk._id}>
                <div className=''>
                <h2 className=' font-bold font-bold underline text-3xl text-left'>{tk.title}</h2><br/>
                </div>
                <div>
                <h2 className='text-lg text-left'>{tk.description}</h2></div>
              </div>
              </div>
          )
        }
          )
      }
      </table>
    </div>
  </section>
  )
}

export default Listnews