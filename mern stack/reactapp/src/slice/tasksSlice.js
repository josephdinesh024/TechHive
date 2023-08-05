import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const token = localStorage?.getItem("token")

const initialState = {
    tasksList:[],
    usertasks :[],
    selectedTask:{},
    isLoading:false,
    error:''
}

const BASE_URL = 'http://localhost:4000/news'

//GET
export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        console.log(response)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No Tasks Found'})
        }
    }
)
export const getUser = createAsyncThunk(
    "tasks/getUser",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        console.log(response)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No Tasks Found'})
        }
    }
)
//POST 
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (tk,{rejectWithValue}) => {
        const options = {
            method:'POST',
            body: JSON.stringify(tk),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

//PATCH 
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method:'PATCH',
            body: JSON.stringify(task),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        console.log(task)
        const response = await fetch(BASE_URL + '/' + task._id,options)
        if (response.ok) {
            const jsonResponse = await response.json()
            console.log("yes")
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not Updated'})
        }
    }
)

//DELETE 
export const deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method:'DELETE',
        }
        const response = await fetch(BASE_URL + '/' + task._id,options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not Deleted'})
        }
    }
)




const tasksSlice = createSlice({
    name:'tasksSlice',
    initialState,
    reducers: {
        
        removeTaskFromList:(state,action) => {
            state.tasksList = state.tasksList.filter((task) => task._id !== action.payload._id)
        },
        
        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }

    },
    extraReducers:(builder) => {
        builder
            .addCase(getTasksFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getTasksFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList = action.payload
                state.tasksList = state.tasksList.filter((task) => task.publish === true)
            })
            .addCase(getTasksFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })
            .addCase(getUser.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.usertasks = action.payload
                state.usertasks = state.usertasks.filter((task) => task.username === token)
            })
            .addCase(getUser.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.usertasks = []
            })
            .addCase(addTaskToServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(addTaskToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(updateTaskInServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updateTaskInServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList = state.tasksList.map((task) => task._id === action.payload._id ? action.payload : task )
            })
            .addCase(updateTaskInServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(deleteTaskFromServer.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteTaskFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteTaskFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }

})

export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = tasksSlice.actions

export default tasksSlice.reducer