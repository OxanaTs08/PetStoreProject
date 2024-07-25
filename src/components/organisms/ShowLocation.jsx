import { useLocation, NavLink } from 'react-router-dom';

function ShowLocation() {
  const location = useLocation();
  return <NavLink>{location.pathname}</NavLink>;
}

export default ShowLocation;
