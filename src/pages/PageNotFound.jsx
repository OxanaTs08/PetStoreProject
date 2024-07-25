import { Typography, styled, Stack } from '@mui/material';
import pagenotfound from '../assets/pagenotfound.png';
import MainButton from '../components/organisms/MainButton';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const PageNotFound = () => {
  return (
    <Stack
      sx={{
        gap: '30px',
        alignItems: 'center',
        width: '100%',
        padding: '30px',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(13, 80, 255, 1)',
            fontWeight: 'bold',
            fontSize: '300px',
          }}
          variant="h1"
        >
          4
        </Typography>
        <img src={pagenotfound} alt="pagenotfound" />
        <Typography
          sx={{
            color: 'rgba(13, 80, 255, 1)',
            fontWeight: 'bold',
            fontSize: '300px',
          }}
          variant="h1"
        >
          4
        </Typography>
      </Stack>
      <Stack
        sx={{
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Page Not Found
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(139, 139, 139, 1' }}>
          {' '}
          We are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </Typography>
        <StyledNavLink to="/">
          {' '}
          <MainButton buttonText="Go Home" />
        </StyledNavLink>
      </Stack>
    </Stack>
  );
};
export default PageNotFound;
