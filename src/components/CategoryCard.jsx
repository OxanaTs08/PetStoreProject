import { Stack, styled, Typography } from '@mui/material/';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)(() => ({
  color: 'rgba(40, 40, 40, 1)',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(40, 40, 40, 0.5)',
  },
}));

const CategoryCard = ({ category }) => {
  return (
    <StyledNavLink to={`/categories/${category.id}`}>
      <Stack sx={{ gap: '16px' }}>
        <img
          src={`http://localhost:3333/${category.image}`}
          alt={category.title}
        />
        <Typography sx={{ textAlign: 'center' }}>{category.title}</Typography>
      </Stack>
    </StyledNavLink>
  );
};

export default CategoryCard;
