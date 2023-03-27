import React, { FC } from 'react'

interface Props {
  onSearch: (value: string) => void
  resultsCount: number
}
const Search: FC<Props> = ({ onSearch, resultsCount }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className='search-wrapper flex items-center justify-end gap-2 pb-8'>
      <span className='results-number rounded bg-blue px-1 text-white'>
        {resultsCount}
      </span>
      <input
        type='text'
        name='search'
        placeholder='Filter podcasts...'
        className='rounded border border-grey px-2 py-1 placeholder:text-gray-500 shadow-sm'
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Search
