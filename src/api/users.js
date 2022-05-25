import { Octokit } from "octokit"

export const fetchUsers = async (query, accessToken) => {
    const octokit = new Octokit({
      auth: accessToken
    })
    let data = {
      total_count: 0,
      incomplete_results: false, 
      items: []
    }
    try {
      const response = await octokit.request('GET /search/users', {q: query, per_page: 30})
      data = response.data
    } catch(err) {
      console.log(err);
    }
    return data;
}