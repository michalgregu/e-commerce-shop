import { firestore } from '../firebase/utils';

export const checkUserIsAdmin = currentUser => {
	if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

	const { userRoles } = currentUser;
	if (userRoles.includes('admin')) return true;

	return false;
};

export const addProduct = product => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc()
			.set(product)
			.then(() => {
				resolve();
			})
			.catch(err => reject(err));
	});
};
