import { firestore } from '../firebase/utils';

export const checkUserIsAdmin = currentUser => {
	if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

	const { userRoles } = currentUser;
	if (userRoles.includes('admin')) return true;

	return false;
};

export const addRecord = product => {
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

export const fetchRecords = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.get()
			.then(snapshot => {
				const productsArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id,
					};
				});
				resolve(productsArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const deleteRecord = documentID => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(documentID)
			.delete()
			.then(() => {
				resolve();
			})
			.catch(err => {
				reject(err);
			});
	});
};
