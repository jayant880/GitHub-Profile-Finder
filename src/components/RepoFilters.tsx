import type React from "react";
import { useState, type ChangeEvent } from "react";

interface RepoFilterProps {
    onFilterChange: (filter: 'all' | 'sources' | 'forks') => void;
    onSearch: (query: string) => void;
    repoCount: number
}

const RepoFilters: React.FC<RepoFilterProps> = ({ onFilterChange, onSearch, repoCount }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                    Showing <span className="font-bold flex-col md:flex-row gap-4">{repoCount}</span> repositories
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search repositories..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => onFilterChange('all')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            All
                        </button>
                        <button
                            onClick={() => onFilterChange('sources')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Sources
                        </button>
                        <button
                            onClick={() => onFilterChange('forks')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Forks
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RepoFilters