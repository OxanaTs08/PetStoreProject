import { Typography, Paper, Stack , styled, TextField, Button, Box, Dialog, DialogActions, Container, DialogContent, DialogTitle, DialogContentText} from "@mui/material"
import { connect } from "react-redux"
import { useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendOrder } from "../../redux/slice/CartSlice" 
import MainButton from "../../components/organisms/MainButton"

const StyledPaper = styled(Paper)({
  width: '70%',
  padding: '20px', 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '20px',
  alignSelf: 'flex-start',
  backgroundColor: 'rgba(241, 243, 244, 1)'
})

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  border: 'none',
  borderRadius: '8px',
  width: '100%',
  input: { color: 'rgba(255, 255, 255, 1)' },
  backgroundColor: 'rgba(255, 255, 255, 1)'
})
)

const CartSummary = ({cartList}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cart)
  const [open, setOpen] = useState(false);

  const totalPrice = useMemo(() => {
    return cartList.reduce((acc, item) => {
      const price = item.discont_price ? item.discont_price : item.price 
    return acc + parseFloat(price) * item.quantity
    }, 0).toFixed(2)
  }, [cartList])

  const totalItems = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartList]);
       
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
      if (!nameError ) {
        setSubmittedData({name, email, phone})
        setName("")
        setEmail("")
        setPhone("")
      }  
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    }

    const handleConfirmOrder = () => {
      const clientData = {name, email, phone}
      dispatch(sendOrder(cartItems, clientData));
      handleClickOpen()
      console.log(cartItems, clientData)
    };  

  return (
  <>
    {cartList.length > 0 && (
      <StyledPaper>
        <Stack spacing={2} >
          <Typography variant='h3' sx={{fontWeight: 'bold'}}>Order Details</Typography>
          <Typography variant='h5'sx={{color: 'rgba(139, 139, 139, 1)'}}>{totalItems} items </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5' sx={{color: 'rgba(139, 139, 139, 1)'}}>Total  </Typography> 
            <Typography variant='h3' sx={{fontWeight: 'bold'}}>$ {totalPrice} </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
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
              <MainButton buttonText="Order" onClick={handleConfirmOrder} sx={{width: '100%'}}/>
            </Box> 
          </form>
        </Stack>
      </StyledPaper>
    )}
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    > 
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(13, 80, 255, 1)'}}>
      <DialogTitle sx={{backgroundColor: 'rgba(13, 80, 255, 1)', color: 'rgba(255, 255, 255, 1)'}} id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
      <DialogActions sx={{backgroundColor: 'rgba(13, 80, 255, 1)'}}>
          <Button sx={{color: 'rgba(255, 255, 255, 1)'}} onClick={handleClose}>x</Button>
        </DialogActions>
    </Box>    
        <DialogContent sx={{backgroundColor: 'rgba(13, 80, 255, 1)'}}>
          <DialogContentText id="alert-dialog-description" sx={{color: 'rgba(255, 255, 255, 1)'}}>
            Your Order has been succesfully placed on the website. Our manager will contact you shortly to confirm your order.
          </DialogContentText>
        </DialogContent>
    </Dialog>
  </>
 )
}

export default connect()(CartSummary);