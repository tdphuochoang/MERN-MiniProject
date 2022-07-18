import {configureStore} from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import profileReducer from "./profileSlice"

export const store = configureStore({
    reducer: {
        profiles: profileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch : () => AddDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
