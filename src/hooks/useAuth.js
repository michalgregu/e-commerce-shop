import { useEffect } from 'react';

const useAuth = props => {
	useEffect(() => {
		if (!props.currentUser) {
			props.history.push('/login');
		}
	}, [props.currentUser]);

	return props.currentUser;
};

export default useAuth;
