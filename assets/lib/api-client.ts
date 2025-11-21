import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
// @ts-ignore
import { paths } from '@types/api';

const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;

const fetchClient = createFetchClient<paths>({
  baseUrl,
});

export const $api = createClient(fetchClient);
export { fetchClient };
