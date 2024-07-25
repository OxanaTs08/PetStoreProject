import { Typography, Paper, Stack, styled, TextField } from '@mui/material';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../redux/slice/CartSlice';
import MainButton from '../../components/organisms/MainButton';
import DialogWindow from '../../components/organisms/DialogWindow';

const StyledPaper = styled(Paper)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignSelf: 'flex-start',
  backgroundColor: 'rgba(241, 243, 244, 1)',
});

const StyledTextField = styled(TextField)(() => ({
  border: 'none',
  borderRadius: '8px',
  input: { color: 'rgba(255, 255, 255, 1)' },
  backgroundColor: 'rgba(255, 255, 255, 1)',
}));

const CartSummary = ({ cartList }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [open, setOpen] = useState(false);

  const totalPrice = useMemo(() => {
    return cartList
      .reduce((acc, item) => {
        const price = item.discont_price ? item.discont_price : item.price;
        return acc + parseFloat(price) * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cartList]);

  const totalItems = useMemo(() => {
    return cartList.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartList]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [formError, setFormError] = useState(false);

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
    e.preventDefault();
    if (!nameError && name && email && phone) {
      setSubmittedData({ name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
      const clientData = { name, email, phone };
      dispatch(sendOrder(cartItems, clientData)), console.log(clientData);
      console.log(cartItems);
      handleClickOpen();
    } else {
      setFormError(true);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {cartList.length > 0 && (
        <StyledPaper>
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Order Details
            </Typography>
            <Typography variant="h5" sx={{ color: 'rgba(139, 139, 139, 1)' }}>
              {totalItems} items{' '}
            </Typography>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'rgba(139, 139, 139, 1)' }}>
                Total{' '}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                $ {totalPrice}{' '}
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack
                sx={{
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <StyledTextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  type="text"
                  value={name}
                  inputProps={{
                    pattern: '[A-Za-z ]+',
                  }}
                  error={nameError}
                  helperText={
                    nameError ? 'Your name must contain only letters' : ''
                  }
                  onChange={handleNameChange}
                />
                <StyledTextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  type="text"
                  value={phone}
                  inputProps={{
                    pattern: '[0-9]*',
                  }}
                  helperText={
                    nameError ? 'Your phone must contain only numbers' : ''
                  }
                  onChange={(e) => setPhone(e.target.value)}
                />
                <StyledTextField
                  label="Enter Your Email"
                  fullWidth
                  margin="normal"
                  type="email"
                  value={email}
                  helperText={nameError ? 'Please enter valid email' : ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MainButton
                  buttonText="Order"
                  type="submit"
                  sx={{ width: '100%' }}
                />
              </Stack>
            </form>
            {formError && (
              <Typography variant="body1" color="error" textAlign={'center'}>
                Please fill in all fields
              </Typography>
            )}
          </Stack>
        </StyledPaper>
      )}
      <DialogWindow
        open={open}
        handleClose={handleClose}
        WindowText="Your Order has been succesfully placed on the website. 
    Our manager will contact you shortly to confirm your order."
      />
    </>
  );
};

export default CartSummary;
