import React from 'react'
import { styled} from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppDispatch } from '../redux/store'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import { makeStyles } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {clearProfiles, deleteProfile } from '../redux/profileSlice';
import "./Home.css"

//Import from MUI
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Home = () => {
     const {profiles} = useAppSelector(state => state.profiles);
     let navigate = useNavigate();
     let dispatch = useAppDispatch();
     const handleDelete = (id: String) => {
      if(window.confirm("Are you sure you wanted to delete this user?")){
        dispatch(deleteProfile(id))
          console.log(id)
        
      }
    }

    const handleClear = () => {  
      dispatch(clearProfiles())
    }

  return (
    <div>
        <h2>Profile Management System</h2>
        <div style = {{padding: "10px"}}>
          <Button style = {{marginRight: "5px"}} variant = "contained" color = "primary" onClick = {() => navigate("/addUser")}>Add User</Button>
          <Button variant = "contained" color = "warning" onClick = {handleClear}>Clear</Button>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Profile pic</StyledTableCell>
            <StyledTableCell align="center">Name&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Phone&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles && profiles.map((profile) => (
            <StyledTableRow key={Number(profile._id)}>
              <StyledTableCell align="center">
              <div className="img-holder">
                <img src={profile.profilePic} alt="img" className="profile-img" />
              </div>
              </StyledTableCell>
              <StyledTableCell align="center">{profile.name}</StyledTableCell>
              <StyledTableCell align="center">{profile.email}</StyledTableCell>
              <StyledTableCell align="center">{profile.phone}</StyledTableCell>
              <StyledTableCell align="center">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button style = {{marginRight: "5px"}} color = "secondary" onClick = {() => handleDelete(profile._id)}>Delete</Button>
                  <Button color = "primary" onClick = {() => navigate(`/editUser/${profile._id}`)}>Edit</Button>              
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home