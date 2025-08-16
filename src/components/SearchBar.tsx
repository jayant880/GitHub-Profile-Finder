import { Search } from "lucide-react";
import React, { useState, type ChangeEvent } from "react"

interface SearchBarProps {
    getUsername: (newUsername: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ getUsername }) => {
    const [search, setSearch] = useState<string>('');
    const handleSearch = () => {
        if (search.trim()) getUsername(search)
        setSearch('')
    }
    return (
        <div className="mb-6">
            <div className="flex shadow-md rounded-lg overflow-hidden">
                <input
                    className="flex-grow px-4 py-3 focus:outline-none"
                    type="text"
                    placeholder="Enter GitHub username"
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 transtion flex items-center"
                >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchBar