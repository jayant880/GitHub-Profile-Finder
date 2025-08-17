import React from 'react'
import type { GitHubRepo } from '../types/types'
import { CircleDot, Eye, GitFork, Star } from 'lucide-react'

interface RepoCardProps {
    repo: GitHubRepo
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className='bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition'>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <a
                        href={repo.html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-xl font-bold text-blue-600 hover:underline'
                    >
                        {repo.name}
                    </a>
                    {repo.language && (
                        <span
                            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                        >
                            {repo.language}
                        </span>
                    )}
                </div>
                {repo.description && (
                    <p className='mt-2 text-gray-600'>{repo.description}</p>
                )}
                <div className='mt-4 flex flex-wrap gap-2'>
                    {repo.topics?.map(topic => (
                        <span
                            key={topic}
                            className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800'
                        >
                            {topic}
                        </span>
                    ))}
                </div>
                <div className='mt-4 flex items-center text-sm text-gray-500'>
                    <div className="flex items-center mr-4">
                        <Eye className='w-4 h-4 mr-1' />
                        {repo.watchers_count}
                    </div>
                    <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count}
                    </div>
                    <div className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks_count}
                    </div>
                    <div className="ml-auto flex items-center">
                        <CircleDot className="w-4 h-4 mr-1" />
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RepoCard