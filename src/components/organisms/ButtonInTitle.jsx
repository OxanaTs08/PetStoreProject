import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  color: 'rgba(139, 139, 139, 1)',
  borderColor: 'rgba(139, 139, 139, 1)',
  borderRadius: '8px',
  padding: '8px 16px',
  maxWidth: 'max-content',
  textTransform: 'none',
  '&:hover': {
    boxShadow: 'none',
    borderColor: 'rgba(139, 139, 139, 1)',
    color: 'rgba(139, 139, 139, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
}));

const ButtonInTitle = ({ buttonTitle, buttonPath, sx }) => {
  return (
    <StyledButton variant="outlined" to={buttonPath} sx={sx}>
      {buttonTitle}
    </StyledButton>
  );
};

export default ButtonInTitle;
