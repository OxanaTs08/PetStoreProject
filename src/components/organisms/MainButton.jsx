import { Button, styled } from "@mui/material"

const StyledButton = styled(Button)(() => ({
  color: "rgba(255, 255, 255, 1)", 
  backgroundColor: "rgba(13, 80, 255, 1)",
  borderRadius: "8px",
  padding: "16px 56px",
  textTransform: 'none',
  // maxWidth: 'max-content',
  '&:hover': {
    backgroundColor: "rgba(7, 8, 8)",
  },
  '&:active': {
    transform: 'translateY(2px)',
  },
}))


const MainButton = ({buttonText, onClick, ...props}) => {
  return (
    <StyledButton variant="contained" onClick={onClick} {...props}>
      {buttonText}
    </StyledButton>
  )
}

export default MainButton