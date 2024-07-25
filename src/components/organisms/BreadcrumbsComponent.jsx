import { NavLink } from 'react-router-dom';
import ButtonInTitle from './ButtonInTitle.jsx';
import { Divider, Stack } from '@mui/material';

const BreadCrumbsComponent = ({ breadcrumbs }) => {
  return (
    <Stack alignItems={'center'} flexDirection={'row'}>
      {breadcrumbs.map((breadcrumb, index) => (
        <Stack
          key={breadcrumb.title}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <NavLink to={breadcrumb.link}>
            <ButtonInTitle
              buttonTitle={breadcrumb.title}
              sx={{
                '&.MuiButton-root': {
                  color:
                    index === breadcrumbs.length - 1
                      ? 'rgb(0,0,0)'
                      : 'rgba(139, 139, 139, 1)',
                },
              }}
            />
          </NavLink>
          {index !== breadcrumbs.length - 1 && (
            <Divider
              sx={{
                color: 'rgba(221, 221, 221, 1)',
                height: '2px',
                width: '16px',
                borderColor: 'gba(221, 221, 221, 1)',
              }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default BreadCrumbsComponent;
