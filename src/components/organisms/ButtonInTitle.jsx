import { Button, styled } from "@mui/material"

const StyledButton = styled(Button)(() => ({
  color: "rgba(139, 139, 139, 1)", 
  borderColor: "rgba(139, 139, 139, 1)",
  borderRadius: "8px",
  padding: "8px 16px",
  marginTop: '10px',
  maxWidth: 'max-content',
  textTransform: 'none',
  '&:hover': {
    color: "rgba(139, 139, 139, 1)",
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
}))

const ButtonInTitle = ({buttonTitle, buttonPath}) => {
  return (
      <StyledButton variant="outlined" to={buttonPath}>{buttonTitle}</StyledButton>
  )
}

export default ButtonInTitle