import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = { auto: true, responseMethod: 'json' };

export function useFetch(request, options = DEFAULT_OPTIONS) {
	const [error, setError] = useState();
	const [trigger, setTrigger] = useState(options.auto);
	const [loading, setLoading] = useState();
	const [data, setData] = useState();
	const [response, setResponse] = useState();

	useEffect(() => {
		async function fetchRequest() {
			setLoading(true);
			const response = await fetch(request.url, request);
			if (response.ok) {
				const result = await response[options.responseMethod]();
				setResponse(response);
				setData(result);
			} else {
				setError(response);
			}
			setLoading(false);
		}
		if (trigger) {
			fetchRequest();
		}
	}, [JSON.stringify(request), trigger, options.responseMethod]);

	return [{ error, data, loading, response }, setTrigger];
}
