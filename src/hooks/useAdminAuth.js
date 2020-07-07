import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = props => {
	const currentUser = useContext(UserContext);

	const history = useHistory();

	useEffect(() => {
		if (!checkUserIsAdmin(currentUser)) {
			history.push('/login');
		}
	}, [currentUser]);

	return currentUser;
};

export default useAdminAuth;
