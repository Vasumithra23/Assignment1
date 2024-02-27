import './App.css';
import { useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from './delete.svg';


const Users=[
  {id : 1,fname : 'vasumithra', lname : 'gorrepati', email : 'xyz@gmail.com'},
  {id : 2,fname : 'Mahesh', lname : 'gorrepati', email : 'xyz1@gmail.com'},  
];


export default function App() {
  const [user,setuser] = useState(Users);
  return (
    <div className='dashboard'>
      <UserForm user={user} setuser={setuser}/>
      <DisplayUsers user={user} setuser={setuser} />
    </div>
  );
}

function UserForm({user,setuser}){
  const [userForm,setuserForm] = useState({
    id : 0,
    fname : "",
    lname : "",
    email : ""
  });
  const[isValid,setIsValid] = useState(true);

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    switch (id) {
      case "id" : setuserForm((prev)=>{return {...prev,id : Number(value)}}); break;
      case "fname" : setuserForm((prev)=>{return {...prev,fname : value}}); break;
      case "lname" : setuserForm((prev)=>{return {...prev,lname : value}}); break;
      case "email" : setuserForm((prev)=>{return {...prev,email : value}}); break;
    }
  };
  const onFormSubmit =(e) => {
    
   const isDuplicate = user.filter((user) => user.id === Number(userForm.id)).length>0;
   if(isDuplicate)
   {
     setIsValid(!isValid);
     e.preventDefault();
   }
   else{
   setuser([...user,{...userForm}]);
   setIsValid(!isValid);
   e.preventDefault();
   e.target.reset();
   }
  }
  return(
   <div className='form-div'>
   <form onSubmit={onFormSubmit} className='form'>
   <label htmlFor="id">Id </label>
   <input id="id" type="number" onChange={handleChange}></input><br></br>
   <label htmlFor="fname">FirstName </label>
   <input id="fname" onChange={handleChange}></input><br></br>
   <label htmlFor="lname">LastName </label>
   <input id="lname" onChange={handleChange}></input><br></br>
   <label htmlFor="email">Email </label>
   <input id="email" onChange={handleChange}></input><br></br>
   <button type='submit'>
    Add User
   </button>
    {!isValid ? (<p style={{color: "red"}}>Id already exists</p>):(null)}
   </form>
   </div>
  );
}

function DisplayUsers({user,setuser}){

const onhandledelete = (id)=>
{
  setuser(user.filter((t) => t.id !== id))
}
if(user.length>0){
return (
  <div className='display'>
  <TableContainer component={Paper}>
  <div className='tableheading'>List of available users</div>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
      <TableCell align="center"><b>Id</b></TableCell>
        <TableCell align="center"><b>FirstName</b></TableCell>
        <TableCell align="center"><b>LastName</b></TableCell>
        <TableCell align="center"><b>Email</b></TableCell>
        <TableCell align="center"><b>Action</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {user.map((row) => (
        <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="center">{row.id}</TableCell>
          <TableCell align="center">{row.fname}</TableCell>
          <TableCell align="center">{row.lname}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center"><img className='delete-icon' src={logo} onClick={()=> onhandledelete(row.id)}></img></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
)
}
else{
  return <div>No Users to display</div>
}
}

// function AddUser(props){
//   console.log('df');
//   const [adduser,setadduser] = useState(Users);
//   setadduser(...adduser,{
//     fname : props.fname,
//     lname : props.lname,
//     email : props.email,
//   });
// }
