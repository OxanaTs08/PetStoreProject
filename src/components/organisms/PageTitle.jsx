import { Typography, Box} from "@mui/material"

const TitleDivider = ({title}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "raw", padding: '20px 0', gap: '30px', alignItems: "center", marginTop: '80px', width: '100%' }}>
    <Typography variant='h3' sx={{fontWeight: "bold", whiteSpace: 'nowrap',}} >
      {title}
    </Typography>
    <Box sx={{display: "flex", flexDirection: "raw", alignItems: "center", width: '95%' }}>
      
    </Box>
    
    </Box>
  )
}

export default TitleDivider

