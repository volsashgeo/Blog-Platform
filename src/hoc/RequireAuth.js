import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { appSelectors } from '../store';


export default function RequireAuth({ children }) {
  const location = useLocation();

  const user = useSelector(appSelectors.userObj);
  const username = user?.username ?? localStorage.getItem('username');

  if(!username) {
    return <Navigate to="/sign-in" state= {{from: location}}/>
  }

  return children;
}
