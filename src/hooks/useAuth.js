import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';

const useAuth = props => {
	const history = useHistory();
	const currentUser = useContext(UserContext);

	useEffect(() => {
		if (!currentUser) {
			history.push('/login');
		}
	}, [currentUser]);

	return currentUser;
};

export default useAuth;
