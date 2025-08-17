import axios from "axios"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react";
import UserProfile from './components/UserProfile';
import type { GitHubRepo, GitHubUser } from "./types/types";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import StatsCard from "./components/StatsCard";
import RepoFilters from "./components/RepoFilters";
import RepoCard from "./components/RepoCard";


const App = () => {
  const [username, setUsername] = useState<string>('jayant880');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [userRepoList, setUserRepoList] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const [rateLimit, setRateLimit] = useState<{ remaining: number, limit: number } | null>(null)

  const userAPI = axios.create({
    baseURL: 'https://api.github.com/'
  });


  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [userResponse, reposResponse, rateResponse] = await Promise.all([
        userAPI.get<GitHubUser>('/users/' + username),
        userAPI.get<GitHubRepo[]>(`/users/${username}/repos?sort=updated&per_page=100`),
        userAPI.get('/rate_limit')
      ]);

      setUserData(userResponse.data);
      setUserRepoList(reposResponse.data);
      setFilteredRepos(reposResponse.data);
      setRateLimit({
        remaining: rateResponse.data.resources.core.remaining,
        limit: rateResponse.data.resources.core.limit
      });
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false);
    }
  }

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err))
      if (err.response?.status === 404) setError('User Not Found');
      else if (err.response?.status === 403) setError('API rate Limit exceeded. Please try again later.');
      else setError(err.message || 'Failed to fetch user data');
    else if (err instanceof Error) setError(err.message);
    else setError('An unknow error occurred');

    setUserData(null);
    setUserRepoList([]);
    setFilteredRepos([]);
  }

  useEffect(() => {
    if (username.trim()) fetchUserData();
  }, [username]);

  const getUsername = (newUsername: string) => setUsername(newUsername);

  const handleFilterChange = (filter: 'all' | 'forks' | 'sources') => {
    if (filter === 'all') setFilteredRepos(userRepoList);
    else if (filter === 'forks') setFilteredRepos(userRepoList.filter(repo => repo.fork));
    else if (filter === 'sources') setFilteredRepos(userRepoList.filter(repo => !repo.fork));
  }

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredRepos(userRepoList);
      return;
    }
    const filtered = userRepoList.filter(repo =>
      repo.name.toLowerCase().includes(query.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRepos(filtered);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">GitHub Profile Viewer</h1>

          <SearchBar getUsername={getUsername} />

          {rateLimit && (
            <div className="text-sm text-gray-500 text-right mb-2">
              API calls remaining: {rateLimit.remaining}/{rateLimit.limit}
            </div>
          )}

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {userData && !loading && !error && (
            <>
              <StatsCard userData={userData} />
              <UserProfile userData={userData} />
              <RepoFilters
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                repoCount={filteredRepos.length}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {filteredRepos.map((repo: GitHubRepo) => (
                  <RepoCard repo={repo} key={repo.id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App