import SearchBar from '@/app/components/(blog)/search'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='py-20 '>
              <SearchBar/>
{children}
    </div>
  )
}

export default layout
