import type React from "react"
import type { GitHubUser } from "../types/types"

interface StatsCardProps {
    userData: GitHubUser;
}

const StatsCard: React.FC<StatsCardProps> = ({ userData }) => {
    return (
        <div className="bg-white rounded-lg shadow mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Repos</h3>
                    <p className="text-2xl font-bold text-blue-600">{userData.public_repos}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Followers</h3>
                    <p className="text-2xl font-bold text-green-600">{userData.followers}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Following</h3>
                    <p className="text-2xl font-bold text-purple-600">{userData.following}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Gists</h3>
                    <p className="text-2xl font-bold text-yellow-600">{userData.public_gists}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsCard