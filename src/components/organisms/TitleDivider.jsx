import { Typography, Divider, styled, Stack } from '@mui/material';
import ButtonInTitle from './ButtonInTitle';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const TitleDivider = ({ title, buttonTitle, buttonPath }) => {
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
        variant="h3"
        sx={{
          fontWeight: 'bold',
          flexWrap: 'nowrap',
          display: 'flex',
          paddingRight: '30px',
          fontSize: { xs: '28px', sm: '32px' },
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
