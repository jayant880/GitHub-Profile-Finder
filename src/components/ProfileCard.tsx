import type React from "react"
import type { GitHubUser } from "../types/types"

interface ProfileCardProps {
    userData: GitHubUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
    return (
        <div>
            <div className="bg-gradient-to-br from-sky-500 to-indigo-500 m-3 rounded-2xl p-4 flex gap-2.5 ">
                <img
                    src={userData.avatar_url}
                    alt={userData.name ? userData.name : ''}
                    className="h-24 rounded-full border-2 border-green-500"
                />
                <hr />
                <div className="bg-white flex-1 rounded-2xl p-4">
                    <a href={userData.html_url} className="font-extrabold text-2xl">
                        {userData.name === null ? userData.login : userData.name}
                    </a>
                    <div>
                        Loaction: {userData.location === null ? 'No Location Found' : userData.location}
                    </div>
                    <div>
                        Bio : {userData.bio === null ? 'No Bio Found' : userData.bio}
                    </div>
                    <div>
                        Company: {userData.company === null ? 'No company Found' : userData.company}
                    </div>
                    {userData.blog && <p>{userData.blog}</p>}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard