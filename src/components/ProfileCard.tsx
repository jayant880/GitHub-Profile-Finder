import type React from "react"
import type { GitHubUser } from "../types/types"
import { Calendar, Link2, MapPin } from "lucide-react";

interface ProfileCardProps {
    userData: GitHubUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="md:flex">
                <div className="md:flex-shrink-0 p-4 flex justify-center">
                    <img
                        src={userData.avatar_url}
                        alt={userData.name ? userData.name : userData.login}
                        className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center">
                        <a
                            href={userData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition animate-pulse">
                            {userData.name || userData.login}
                        </a>
                        {userData.twitter_username && (
                            <a
                                href={`https://twitter.com/${userData.twitter_username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-400 hover:text-blue-600"
                            >
                                @{userData.twitter_username}
                            </a>
                        )}
                    </div>
                    {userData.bio && (
                        <p className="mt-2 text-gray-600">{userData.bio}</p>
                    )}
                    <div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {userData.location && (
                                <div className="flex item-center text-gray-600">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {userData.location}
                                </div>
                            )}
                            {userData.blog && (
                                <div className="flex items-center text-gray-600">
                                    <Link2 className="w-5 h-5 mr-2" />
                                    <a
                                        href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {userData.blog}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-5 h-5 mr-2" />
                                Joined {new Date(userData.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard