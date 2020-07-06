import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = props => {
	const history = useHistory();

	useEffect(() => {
		if (!checkUserIsAdmin(props.currentUser)) {
			history.push('/login');
		}
	}, [props.currentUser]);

	return props.currentUser;
};

export default useAdminAuth;
