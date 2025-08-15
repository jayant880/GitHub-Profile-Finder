import React, { useState, type ChangeEvent } from "react"

interface SearchBarProps {
    getUsername: (newUsername: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ getUsername }) => {
    const [search, setSearch] = useState<string>('');
    const handleSearch = () => {
        getUsername(search);
        setSearch('')
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Enter a github Profile"
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            />
        </div>
    )
}

export default SearchBar