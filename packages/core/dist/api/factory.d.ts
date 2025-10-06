type Fetch = typeof fetch;
type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FetchBody = RequestInit['body'];
declare class FetchFactory {
    private $fetch;
    constructor(fetcher: Fetch);
    /**
     * The HTTP client is utilized to control the process of making API requests.
     * @param url the endpoint url
     * @param method the HTTP method (GET, POST, ...)
     * @param params the request parameters (body, options)
     * @returns A promise that resolves to the response data
     */
    call(url: string, method: FetchMethod, { body, options, }?: {
        body?: FetchBody;
        options?: RequestInit;
    }): Promise<Response>;
}
export default FetchFactory;
