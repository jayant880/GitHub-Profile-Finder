import type React from "react";
import type { GitHubUser } from "../types/types"
import ProfileCard from "./ProfileCard";

interface UserProfileProps {
    userData: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
    return (
        <div className="mb-6">
            <ProfileCard userData={userData} />
        </div>
    )
}

export default UserProfile