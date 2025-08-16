import type React from "react";
import type { GitHubRepo, GitHubUser } from "../types/types"
import ProfileCard from "./ProfileCard";
import RepoCard from "./RepoCard";

interface UserProfileProps {
    userData: GitHubUser;
    repos: GitHubRepo[];
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, repos }) => {
    return (
        <div>
            <ProfileCard userData={userData} />
            <div>
                <div>
                    Repos:
                </div>
                {repos.map((repo: GitHubRepo) => {
                    return <RepoCard repo={repo} key={repo.id} />
                })}
            </div>
        </div>
    )
}

export default UserProfile