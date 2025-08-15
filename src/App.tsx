import axios from "axios"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react";
import UserProfile from './components/UserProfile';
import type { GitHubRepo, GitHubUser } from "./types/types";


const App = () => {
  const [username, setUsername] = useState<string>('jayant880');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [userRepoList, setUserRepoList] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  const userAPI = axios.create({
    baseURL: 'https://api.github.com/users/'
  });


  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        userAPI.get<GitHubUser>(username),
        userAPI.get<GitHubRepo[]>(`${username}/repos?sort=updated&per_page=100`)
      ]);

      setUserData(userResponse.data);
      setUserRepoList(reposResponse.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('User Not Found');
        } else {
          setError(err.message || 'Failed to fetch user data');
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknow Error occurred');
      }

      setUserData(null);
      setUserRepoList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (username.trim())
      fetchUserData();
  }, [username])

  const getUsername = (newUsername: string) => {
    setUsername(newUsername);
  }

  return (
    <div>
      <SearchBar getUsername={getUsername} />
      {loading && <div className="text-center py-8">Loading ...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {
        (userData && !loading && !error) &&
        < UserProfile userData={userData} repos={userRepoList} />
      }
    </div>
  )
}

export default App