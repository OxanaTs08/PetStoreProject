import { NavLink } from 'react-router-dom';
import { Divider, Stack, Typography, styled } from '@mui/material';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(40, 40, 40, 0.5)',
  },
}));
const BreadCrumbsMobile = ({ breadcrumbs }) => {
  return (
    <Stack alignItems={'center'} flexDirection={'row'} sx={{ gap: '10px' }}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Stack
          key={breadcrumb.title}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ gap: '10px' }}
        >
          {index !== breadcrumbs.length - 1 && (
            <StyledNavLink to={breadcrumb.link}>
              <Typography
                sx={{
                  color:
                    index === breadcrumbs.length - 1
                      ? 'rgb(0,0,0)'
                      : 'rgba(139, 139, 139, 1)',
                  textAlign: 'center',
                }}
              >
                {breadcrumb.title}
              </Typography>
            </StyledNavLink>
          )}
          {index !== breadcrumbs.length - 1 && (
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                color: 'rgba(221, 221, 221, 1)',
              }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default BreadCrumbsMobile;
