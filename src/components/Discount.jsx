import { Box, Typography, TextField, Button, styled } from "@mui/material"
import discountimage from "../assets/discountimage.svg"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { saleRequestSend } from "../redux/slice/saleRequestSlice"

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  border: '1px solid rgba(255, 255, 255, 1)',
  borderRadius: '8px',
  '& label': {
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

const Discount = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [nameError, setNameError] = useState(false);

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
    } else {
      alert("Please fill in all fields")
    }
  }
  return (
    <Box sx={{display: 'flex', 
             flexDirection: 'column', 
             gap: '24px', 
             borderRadius: '8px', 
             padding: '32px', 
             backgroundColor: 'rgba(36, 81, 198, 1)',
             marginTop: '80px',
             }}>
      <Box>
        <Typography variant="h3" 
                    sx={{fontWeight: 'bold', textAlign: 'center', color: 'rgba(255, 255, 255, 1)'
                    }}>5% off on the first order</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: '32px',}}>
        <Box sx={{marginBottom: '-32px', marginLeft:`-32px`}} >
          <img src={discountimage} alt="discountimage"/>
        </Box>
        <Box sx={{width: '100%'}}>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPhone(e.target.value)}
              />
              <StyledTextField
                label="Enter Your Email"
                fullWidth
                margin="normal"
                type="email"
                value={email}
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
    </Box>
  )
}

export default Discount