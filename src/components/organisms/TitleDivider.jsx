import { Typography, Divider, styled, Stack } from '@mui/material';
import ButtonInTitle from './ButtonInTitle';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const TitleDivider = ({ title, buttonTitle, buttonPath }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        padding: '20px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant={isSmallScreen ? 'h5' : 'h3'}
        sx={{
          fontWeight: 'bold',
          flexWrap: 'nowrap',
          display: 'flex',
          paddingRight: '30px',
        }}
      >
        {title}
      </Typography>
      <Divider
        sx={{
          color: 'rgba(221, 221, 221, 1)',
          height: '2px',
          flexGrow: 1,
          borderColor: 'gba(221, 221, 221, 1)',
        }}
      />
      <StyledNavLink to={buttonPath}>
        {' '}
        <ButtonInTitle buttonTitle={buttonTitle} />{' '}
      </StyledNavLink>
    </Stack>
  );
};

export default TitleDivider;
