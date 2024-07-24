import { Typography} from "@mui/material"
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material';

const PageTitle = ({title}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
    <Typography variant={isSmallScreen? 'h5' : 'h3'} sx={{fontWeight: "bold", whiteSpace: 'nowrap',}} >
      {title}
    </Typography>
    </>
  )
}

export default PageTitle

