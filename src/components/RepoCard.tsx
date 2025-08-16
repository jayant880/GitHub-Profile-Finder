import React from 'react'
import type { GitHubRepo } from '../types/types'

interface RepoCardProps {
    repo: GitHubRepo
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className="border-1 p-3 m-3 rounded-2xl">
            <a
                href={repo.clone_url}
                target="_blank"
                className="text-2xl font-mono">
                {repo.name}
            </a>
            <div>
                {repo.description}
            </div>
            <div className="text-gray-400">
                {repo.created_at.split('T')[0]}
            </div>
        </div>
    )
}

export default RepoCard