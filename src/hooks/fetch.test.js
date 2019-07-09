import { renderHook, act } from '@testing-library/react-hooks';
import { useFetch } from './fetch';

const url = 'https://jsonplaceholder.typicode.com/users/1';
const url404 = 'https://jsonplaceholder.typicode.com/users/404';
const urlBlob = 'https://picsum.photos/id/693/16/16';

test('it should update the loading status', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));
	expect(result.current[0].loading).toBe(true);
	await waitForNextUpdate();
	expect(result.current[0].loading).toBe(false);
	expect(result.current[0].response.ok).toBe(true);
	expect(result.current[0].response.status).toBe(200);
});

test('it should return the response of the request', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));
	expect(result.current[0].response).toBe(undefined);
	await waitForNextUpdate();
	expect(result.current[0].response.ok).toBe(true);
	expect(result.current[0].response.status).toBe(200);
});

test('it should return the data of the request', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useFetch({ url }));
	expect(result.current[0].data).toBe(undefined);
	await waitForNextUpdate();
	expect(result.current[0].data.name).toBeDefined();
});

test('it should return an error if status code if greater than 399', async () => {
	const { result, waitForNextUpdate } = renderHook(() =>
		useFetch({ url: url404 }),
	);
	expect(result.current[0].error).toBe(undefined);

	await waitForNextUpdate();

	expect(result.current[0].error.status).toBe(404);
	expect(result.current[0].data).toBe(undefined);
});

test('it should not make an automatically request if auto is false', async () => {
	const { result, waitForNextUpdate } = renderHook(() =>
		useFetch({ url }, { auto: false, responseMethod: 'json' }),
	);

	expect(result.current[0].loading).toBe(undefined);

	act(() => {
		result.current[1](true);
	});

	await waitForNextUpdate();

	expect(result.current[0].loading).toBe(false);
});

test('it should return a blob response', async () => {
	const { waitForNextUpdate, result } = renderHook(() =>
		useFetch({ url: urlBlob }, { auto: true, responseMethod: 'blob' }),
	);

	expect(result.current[0].response).toBe(undefined);

	await waitForNextUpdate();

	expect(result.current[0].data instanceof Blob).toBe(true);
});
