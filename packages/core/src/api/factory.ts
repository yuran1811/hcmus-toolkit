type Fetch = typeof fetch;
type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type FetchBody = RequestInit['body'];

class FetchFactory {
  private $fetch: Fetch;

  constructor(fetcher: Fetch) {
    this.$fetch = fetcher;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @returns A promise that resolves to the response data
   */
  async call(
    url: string,
    method: FetchMethod,
    {
      body,
      options,
    }: {
      body?: FetchBody;
      options?: RequestInit;
    } = {},
  ): Promise<Response> {
    return this.$fetch(url, { method, body, ...options });
  }
}

export default FetchFactory;
