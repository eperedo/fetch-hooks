> Use the fetch API with react hooks

### Instalation

```bash
yarn add @eperedo/fetch-hooks
```

```bash
npm install @eperedo/fetch-hooks
```

### Usage

```js
import React from 'react';
import { useFetch } from 'fetch-hooks';

const url = 'https://jsonplaceholder.typicode.com/users/1';

function UserProfile() {
	const [{ data: user, loading }] = useFetch({ url });

	if (loading) {
		return <div>Loading User Profile...</div>;
	}

	return <h1>{data.name}</h1>;
}

export default UserProfile;
```
