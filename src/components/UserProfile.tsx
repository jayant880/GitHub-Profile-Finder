import type React from "react";
import type { GitHubRepo, GitHubUser } from "../types/types"

interface UserProfileProps {
    userData: GitHubUser;
    repos: GitHubRepo[];
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, repos }) => {
    return (
        <div>UserProfile
            <div>
                {userData.name}
            </div>
            <div>
                {repos.map((repo: GitHubRepo) => {
                    return <>
                        {repo.id}
                    </>
                })}
            </div>
        </div>
    )
}

export default UserProfile