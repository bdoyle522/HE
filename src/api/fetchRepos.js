const GITHUB_ENDPOINT = 'https://api.github.com/search/repositories';
const GET = 'GET';
const CORS = 'cors';

export const fetchRepos = async (search, sort = '', sortOrder = '') => {
  const response = await fetch(
    `${GITHUB_ENDPOINT}?q=${search}&sort=${sort}&order=${sortOrder}`,
    {
      method: GET,
      mode: CORS,
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const { status } = response;
  const results = await response.json();
  return { results: results?.items || [], status };
};
