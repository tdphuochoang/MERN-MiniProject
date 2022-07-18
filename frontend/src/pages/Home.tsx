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
import { useAppSelector } from '../redux/store'
// import { makeStyles } from '@mui/material';
import { useNavigate } from "react-router-dom";


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

//   const useStyles = makeStyles({
//     table: {
//       marginTop: 100,
//       minWidth: 700,
//     }
//   })


const Home = () => {
    // const classes = useStyles();
     const {profiles} = useAppSelector(state => state.profiles);
     let navigate = useNavigate();
     console.log(profiles)

  return (
    <div>
        <h2>Profile Page</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Profile pic</StyledTableCell>
            <StyledTableCell align="center">Name&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Email&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Phone&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Action&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles && profiles.map((profile, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {/* {profile.profilePic} */}
              </StyledTableCell>
              <StyledTableCell align="center">{profile.name}</StyledTableCell>
              <StyledTableCell align="center">{profile.email}</StyledTableCell>
              <StyledTableCell align="center">{profile.phone}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home