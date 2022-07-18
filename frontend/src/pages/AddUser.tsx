import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import "./AddUser.css"
import { createProfile } from '../redux/profileSlice';

const AddUser = () => {
    const [state, setState] = useState({
        profilePic: "",
        name: "",
        email: "",
        phone: "",
      })

      const [error, setError] = useState(""); 
        let navigate = useNavigate();
        let dispatch = useAppDispatch();
  const {profilePic, name, email, phone} = state;

  const handleInputChange = (e: any) => {
    let {name, value} = e.target;
    setState({...state, [name]: value});
  }

      const handleSubmit = (e: any) => {
        e.preventDefault();
        if(!name || !profilePic|| !email || !phone){
            setError("Please input all the input fields")
        }else{
            dispatch(createProfile(state));
            navigate("/");
            setError("");
        }
      }

  return (
    <div className = "AddUserContainer">
        <Button style = {{width: "100px", marginTop: "20px"}} variant = "contained" color = "secondary" onClick = {() => navigate("/") }>Go back</Button>
        <h2>Add User</h2>
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
        <TextField id="standard-basic" label="ProfilePic" name = "profilePic" variant="standard" value = {profilePic} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Name" name = "name" variant="standard" value = {name} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Email" name = "email" variant="standard" value = {email} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Phone" name = "phone" variant="standard" value = {phone} type = "text" onChange = {handleInputChange} />
        <br/>         
        <Button style = {{width: "100px"}} variant = "contained" color = "primary" type = "submit">Submit</Button>
        </Box>

    </div>
  )
}

export default AddUser