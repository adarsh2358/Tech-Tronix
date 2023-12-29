import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { Box, FormControl, OutlinedInput, InputLabel, FormControlLabel, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Switch from '@mui/material/Switch';
import img from "./poster_techtronix_just.png"
import { Link,useNavigate } from 'react-router-dom';
import { app, database } from "../Components/firebase"
import { ref, push, get, child, orderByChild, equalTo } from 'firebase/database';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SignUpForm = () => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Name: '',
        email: '',
        password: '',
        cpassword: "",
        reg: "",
    });
    const [checked, setChecked] = React.useState(true);
    const handleChange2 = (event) => {
        setChecked(event.target.checked);
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        if (e.target.name === "reg") {
            const inputValue = e.target.value.replace(/[^0-9]/g, '');
            // Limit to 10 characters
            inputValue.slice(0, 10);
        }

        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const db = database;
            const usersRef = ref(db, 'users');

            // Check if the email is already registered
            const emailQuery = await get(
                usersRef,
                orderByChild('email'),
                equalTo(values.email)
            );

            if (emailQuery.exists()) {
                // Email is already registered, show alert
                handleClickOpen();
                return;
            }

            // Push user data to the 'users' node
            await push(usersRef, {
                Name: values.Name,
                email: values.email,
                password: values.password,
                registrationNumber: values.reg,
            });

            console.log('User data submitted to Firebase:', values);
            navigate('/login');
        } catch (error) {
            console.error('Error submitting user data to Firebase:', error);
        }
    };
    console.log(values)
    return (
        <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{textTransform:"none",fontSize:"22px",fontFamily:"Montserrat"}}>
          {"Email is already registered."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{textTransform:"none",fontSize:"18px",fontFamily:"Montserrat"}}>
          Do you want to proceed to signin ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform:"none",fontSize:"16px",fontFamily:"Montserrat",color:"#3d3d3d"}}>Close</Button>
          <Button href="/signin" autoFocus sx={{textTransform:"none",fontSize:"16px",fontFamily:"Montserrat",color:"#3d3d3d"}}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
        <Box sx={{ display: "flex" ,textTransform:"capitalize"}}>
            <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: "3", heght: "100vh", background: `url(${img})`, backgroundSize: "cover", backgrondRepeat: "no-repeat", backgroundPosition: "center", }}>

            </Box>
            <Box sx={{ flexGrow: "1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDrection: "column", padding: "4rem 0" }}>


                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '30rem', fontSize: "1.6rem", fontWeight: "400" }}>
                    <Box sx={{ fontSize: "4rem", fontWeight: "600" }}>Sign up</Box>
                    <TextField
                        label="Name"
                        name="Name"
                        value={values.Name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required

                        InputProps={{
                            style: {
                                fontSize: "1.6rem",
                                fontWeight: "600",
                                pading:"0px"
                            }
                        }}

                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: {
                                fontSize: "1.6rem",
                                fontWeight: "600"
                            }
                        }}
                    />

                    <FormControl sx={{ marginTop: 2, width: '100%' }} variant="outlined" required>
                        <InputLabel style={{ fontSize: "1.6rem", fontWeight: "600" }} htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput sx={{ fontSize: "1.6rem", fontWeight: "600" }}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ marginTop: 2, width: '100%' }} variant="outlined" required>
                        <InputLabel style={{ fontSize: "1.6rem", fontWeight: "600" }} htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput sx={{ fontSize: "1.6rem", fontWeight: "600" }}
                            name="cpassword"
                            value={values.cpassword}
                            onChange={handleChange}
                            id="outlined-adornment-cpassword"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                    {checked ?
                        <TextField
                            label="registration number"
                            name="reg"
                            type="number"
                            value={values.reg}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            inputProps={{
                                pattern: '[0-9]*', // Only allow numeric input
                                inputMode: 'numeric', // Set the input mode to numeric for mobile devices
                                maxLength: 10, style: {
                                    fontSize: "1.6rem",
                                    fontWeight: "600"
                                }
                            }}
                        /> : ""}
                    <FormControlLabel label={
                        <Typography sx={{ fontSize: "1.6rem",fontWeight:"600",margin:"2rem 0" }}>
                            Vssutian
                        </Typography>
                    } control={<Switch
                        checked={checked}
                        onChange={handleChange2}

                    />} />


                    <Button type="submit" variant="contained" style={{ paddig: "1rem", fontSize: "1.6rem" }}>
                        Sign Up
                    </Button>
                    <Typography sx={{ fontSize: "1.6rem", fontWeight: "600", marginTop: 2 }}>already register? <Link to="/signin">signin</Link></Typography>
                </form>
            </Box>
        </Box>
        </>
    );
};

export default SignUpForm;