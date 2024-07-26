import { Typography, Paper, Stack, styled, TextField } from '@mui/material';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../redux/slice/CartSlice';
import MainButton from '../../components/organisms/MainButton';
import DialogWindow from '../../components/organisms/DialogWindow';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { removeFromCart } from '../../redux/slice/CartSlice';

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
  input: { color: 'rgba(0, 0, 0, 1)' },
  backgroundColor: 'rgba(255, 255, 255, 1)',
}));

const CartSummary = ({ cartList }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isBigTabletScreen = useMediaQuery(theme.breakpoints.down('lg'));

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
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!/^[A-Za-z ]+$/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (nameError && nameValue.length > 0 && /^[A-Za-z ]+$/.test(value)) {
      setNameError(false);
    }
  };
  const handlePhoneChange = (event) => {
    const phoneValue = event.target.value;
    setPhone(phoneValue);
    if (!/^\d+$/.test(phoneValue)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (phoneError && phoneValue.length > 0 && /^\d+$/.test(phoneValue)) {
      setPhoneError(false);
    }
  };

  const handleEmailBlur = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
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
      cartItems.forEach((item) => {
        dispatch(removeFromCart(item.id));
      });
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
            <Typography
              variant={
                isSmallScreen || isTabletScreen || isBigTabletScreen
                  ? 'h4'
                  : 'h3'
              }
              sx={{ fontWeight: 'bold' }}
            >
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
              <Typography
                variant={
                  isSmallScreen || isTabletScreen || isBigTabletScreen
                    ? 'h4'
                    : 'h3'
                }
                sx={{ fontWeight: 'bold' }}
              >
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
                  error={phoneError}
                  helperText={
                    phoneError ? 'Your phone must contain only numbers' : ''
                  }
                  onChange={handlePhoneChange}
                />
                <StyledTextField
                  label="Enter Your Email"
                  fullWidth
                  margin="normal"
                  type="email"
                  value={email}
                  error={emailError}
                  helperText={emailError ? 'Please enter valid email' : ''}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={handleEmailBlur}
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
