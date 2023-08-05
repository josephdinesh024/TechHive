import {configureStore} from "@reduxjs/toolkit"
import tasksReducer from "./slice/tasksSlice"
import userReducer from "./slice/userslice"

export const store = configureStore({
    reducer : {
        tasks : tasksReducer,
        users : userReducer
    }
})