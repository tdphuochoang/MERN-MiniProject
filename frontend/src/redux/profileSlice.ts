import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../interfaces/Profile";
import axios from "axios"

interface ProfileState {
   profiles: Profile[] | null;
   loading: boolean;
   singleProfile: Profile | null;
   errors: any;
}

const initialState: ProfileState = {
    profiles: [],
    singleProfile: null,
    loading: false,
    errors: null
}

//actions => processes that get data from backend 
//get profiles
export const getProfiles = createAsyncThunk<Profile[]>(
   "profiles/getProfiles",
   async (_, thunkAPI) => {
    try{
        const res = await axios.get("http://localhost:8000/api/users");
        return res.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
   } 
)

//create profile
export const createProfile = createAsyncThunk< Object, Profile>(
    "profiles/createProfile",
    async (data, thunkAPI) => {
        try{
            const response = await axios.post("http://localhost:8000/api/users/user", data);
            thunkAPI.dispatch(getProfiles());
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err);
        }
    }
)

//reducers => reduce to a specific state => change state
export const profileSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {
        setProfiles: (state, action: PayloadAction<Profile[]>) => {
            state.profiles = action.payload
        }
    },
     extraReducers: (builder) => {
        builder.addCase(getProfiles.pending, (state, _) => {
            state.loading = true;
        });
        builder.addCase(getProfiles.fulfilled, (state, action) => {
            state.profiles = action.payload;
            state.loading = false;
        });
        builder.addCase(getProfiles.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
     }  
})
 
export default profileSlice.reducer;
export const {setProfiles} = profileSlice.actions;