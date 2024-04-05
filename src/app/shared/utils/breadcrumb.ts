export const formatRoute = (route: string) => {
	// From: detail/id
	// To: id
	return route.split('/').pop();
};
