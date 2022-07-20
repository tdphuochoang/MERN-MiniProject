import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import "./AddUser.css"
import { createProfile } from '../redux/profileSlice';

const s3Url = "http://localhost:8000/s3Url"

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

  const handleInputChange = async (e: any) => {
    let {name, value} = e.target;
    setState({...state, [name]: value});  
  }
  

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let {name} = e.target;
    const file = e.target.files![0]
    if(name === "profilePic"){     
      const {url} = await fetch(s3Url).then(res => res.json())   
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg"
        },
        body: file
      })
      const imageURL1 = url.split("?")[0]
      setState({...state, [name]: imageURL1}) 
    }   
  }
      const handleSubmit = (e: any) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+\.\S+/;   
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(!name || !profilePic|| !email || !phone){
            setError("Please input all the input fields")
        }
        else if(!emailRegex.test(email)){
          setError("Please input a valid email")
        }
        else if(!phoneRegex.test(phone)){
          setError("Please input a valid US phone number")
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
        <label id="profilePicLabel" htmlFor='profile-img'>Please choose your profile image:</label><br/>
        <TextField id="profile-img" name = "profilePic" variant="standard" type = "file" inputProps={{ accept: 'image/*' }} onChange = {handleImageChange}/>
        <br/>
        <TextField id="standard-basic" label="Name" name = "name" variant="standard" value = {name} type = "text" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Email" name = "email" variant="standard" value = {email} type = "email" onChange = {handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Phone" name = "phone" variant="standard" value = {phone} type = "text" onChange = {handleInputChange} />
        <br/>         
        <Button style = {{width: "100px"}} variant = "contained" color = "primary" type = "submit">Submit</Button>
        </Box>

    </div>
  )
}

export default AddUser