import axios from "axios"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react";

const App = () => {

  const userAPI = axios.create({
    baseURL: 'https://api.github.com/users/'
  });

  const [username, setUsername] = useState<string>('jayant880');

  const getUser = async () => {

    const response = await userAPI.get(username);
    const userData = response.data;
    console.log(userData);
  }

  const getUserRepos = async () => {
    const response = await userAPI.get(username + '/repos');
    const userReposList = response.data;
    console.log(userReposList);
  }

  useEffect(() => { getUser(); getUserRepos() })

  const getUsername = (newUsername: string) => {
    setUsername(newUsername);
  }

  return (
    <div>
      <SearchBar getUsername={getUsername} />
    </div>
  )
}

export default App