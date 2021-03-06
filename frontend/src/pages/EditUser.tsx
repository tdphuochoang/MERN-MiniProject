import "./EditUser.css"
import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/store'
import {updateProfile } from "../redux/profileSlice";

const EditUser = () => {
    const [error, setError] = useState(""); 
    let navigate = useNavigate();
    let dispatch = useAppDispatch();
    let params = useParams();
    const {profiles} = useAppSelector((state) => state.profiles);
    const existingProfile = profiles?.filter(profile => profile._id === params.id)
    const {profilePic, name, email, phone} = existingProfile![0]
    const [values, setValues] = useState({
        profilePic,
        name,
        email,
        phone,
    })

      const handleInputChange = (e: any) => {
        let {name, value} = e.target;
        setValues({...values, [name]: value});    
      }

      const handleSubmit = (e: any) => {
        e.preventDefault(); 
        const emailRegex = /\S+@\S+\.\S+/;   
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(!values.name || !values.email || !values.phone){
          setError("Please input all the input fields")
        } else if(!emailRegex.test(values.email as string)){
          setError("Please input a valid email")
        }else if(!phoneRegex.test(values.phone as string)){
          setError("Please input a valid phone number")
        }else{
          setValues({profilePic: '', name: '', email: '', phone: ''})
          dispatch(updateProfile({
            id: params.id,
            profilePic: values.profilePic,
            name: values.name,
            email: values.email,
            phone: values.phone
        }));
          navigate("/");
          setError("");
        }            
      }
    
  return (
    <div className = "EditUserContainer">
        <Button style = {{width: "100px", marginTop: "20px"}} variant = "contained" color = "secondary" onClick = {() => navigate("/") }>Go back</Button>
        <h2>Edit User</h2>
        {error && <h3 style = {{color: "red"}}>{error}</h3>}
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit = {handleSubmit}
        >
        <TextField id="standard-basic" label="ProfilePic" name = "profilePic" variant="standard" value = {values.profilePic || ""} inputProps={
					{ readOnly: true, }} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Name" name = "name" variant="standard" value = {values.name || ""} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Email" name = "email" variant="standard" value = {values.email || ""} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Phone" name = "phone" variant="standard" value = {values.phone || ""} type = "text" onChange = {handleInputChange} />
        <br/>
        <Button style = {{width: "100px"}} variant = "contained" color = "primary" type = "submit">Edit</Button>
        </Box>
    </div>
  )
}

export default EditUser