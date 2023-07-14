'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const SearchBar = () => {
    const router=useRouter()
    const [title,setTitle]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (title === "") return;
        router.push(`/blogs/search?title=${title}`);
    }
  return (
    <form className="max-w-lg mx-auto mb-9">
    <div className="relative">
      <input
       
        type="search"
        id="default-search"
        className="block w-full p-4 pr-10 text-sm text-gray-900 border-2 border-gray-900 rounded-full focus:outline-none bg-white focus:border-blue-500"
        placeholder="SEARCH..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <button  onClick={handleSubmit}
        className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events"
        
      >
        Search
      </button>
    </div>
  </form>
  )
}

export default SearchBar
