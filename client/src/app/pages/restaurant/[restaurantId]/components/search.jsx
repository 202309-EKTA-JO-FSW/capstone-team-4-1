"use client"
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("")

  return (
    <div className="flex items-center bg-gray-200 p-2 rounded-md">
      <FaSearch className="text-gray-600" />
      <input
        type="text"
        placeholder="Search for dishes..."
        className="w-full pl-2 py-1 rounded-md focus:outline-none"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value)
          onSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Search
