import axios from 'axios';

// JSON helper for the /api/* endpoints. axios sends Laravel's XSRF-TOKEN cookie
// back as X-XSRF-TOKEN automatically, so no CSRF meta tag is needed.
export async function api(url, method = 'GET', body) {
    try {
        const res = await axios({
            url,
            method,
            data: body,
            headers: { Accept: 'application/json' },
        });
        return res.status === 204 ? null : res.data;
    } catch (e) {
        const status = e.response?.status;
        if (status === 401 || status === 419) {
            window.location = '/login';
            return;
        }
        const errors = e.response?.data?.errors;
        const first = errors ? Object.values(errors)[0][0] : null;
        throw new Error(first || 'Something went wrong. Please try again.');
    }
}
