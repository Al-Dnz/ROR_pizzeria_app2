
const fetchData = async (url: string, param: string = '') => {
	const response = await fetch(`${url}/${param}`);
	if (!response.ok) {
		const res = await response.json();
		const message = `[ERROR ${response.status} => ${response.statusText}]: ${res.error? res.error : 'undefined error'}`
	  	throw new Error(message);
	}
	const jsonData = await response.json();
	return jsonData;
};

export default fetchData;