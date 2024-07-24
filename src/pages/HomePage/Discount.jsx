import { Box, Typography, TextField, Button, styled } from "@mui/material"
import discountimage from "../../assets/discountimage.svg"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { saleRequestSend } from "../../redux/slice/saleRequestSlice"
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material';
import DialogWindow from "../../components/organisms/DialogWindow"

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  border: '1px solid rgba(255, 255, 255, 1)',
  borderRadius: '8px',
  '& label': {
    color: 'rgba(255, 255, 255, 1)',
  },
  '& .MuiInputBase-input': {
    color: 'rgba(255, 255, 255, 1)',
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 1)',
  },
  '&.Mui-error .MuiInputBase-input': {
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  '&.Mui-error .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 1)',
  },  
})
)
const StyledButton = styled(Button)(() => ({
  color: 'rgba(7, 8, 8)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  borderRadius: '8px',
  padding: '16px 32px',
  textTransform: 'none',
  width: '100%',
  '&:hover': {
    backgroundColor: 'rgba(7, 8, 8)',
    color: 'rgba(255, 255, 255, 1)',
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
}))

const BackgroundImage = styled('img')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignSelf: 'flex-end'
  }))

const Discount = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [nameError, setNameError] = useState(false);

  const theme = useTheme();  
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktop = useMediaQuery(theme.breakpoints.down(1300));
  const isScreenWidth = useMediaQuery(theme.breakpoints.down(1100));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!/^[A-Za-z ]+$/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nameError && name && email && phone) {
      setSubmittedData({name, email, phone})
      setName("")
      setEmail("")
      setPhone("")
    const clientData = {name, email, phone}
    dispatch(saleRequestSend(clientData)),  
    console.log( clientData)
    handleClickOpen()
    } else {
      alert("Please fill in all fields")
    }
  }
  return (
    <Box sx={{display: 'flex', 
             flexDirection: 'column', 
             gap: '24px', 
             borderRadius: '8px',
             paddingTop: '32px',
             backgroundColor: 'rgba(36, 81, 198, 1)',
             }}>
      <Box>
        <Typography variant="h3" 
                    sx={{fontWeight: 'bold', textAlign: 'center', color: 'rgba(255, 255, 255, 1)'
                    }}>5% off on the first order</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: isDesktop ? '0' : '32px'}}>
      {!(isTabletScreen || isSmallScreen || isScreenWidth)  && (
        <BackgroundImage src={discountimage} alt="discountimage" sx={{ width: isDesktop? '70%' : '100%' }} />
      )}  
        <Box sx={{width: '100%'}}>
          <form onSubmit={handleSubmit} style={{padding: '32px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <StyledTextField
                label="Name"
                fullWidth
                margin="normal"
                type="text"
                value={name}
                inputProps={{
                  pattern: "[A-Za-z ]+",
                }}
                error={nameError}
                helperText= {nameError? "Your name must contain only letters" : ''}
                onChange={handleNameChange}
              />
              <StyledTextField
                label="Phone Number"
                fullWidth
                margin="normal"
                type="text"
                value={phone}
                inputProps={{
                  pattern: "[0-9]*",
                }}
                helperText= {nameError? "Your phone must contain only numbers" : ''}
                onChange={(e) => setPhone(e.target.value)}
              />
              <StyledTextField
                label="Enter Your Email"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                helperText= {nameError? "Please enter valid email" : ''}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StyledButton
                type="submit"
                variant="contained"
                >Get a Discount</StyledButton>
            </Box> 
          </form>
        </Box>
      </Box>
      <DialogWindow open={open} handleClose={handleClose} 
      WindowText='Your Request has been succesfully placed on the website. 
      Our manager will contact you shortly.' />
    </Box>
  )
}

export default Discount