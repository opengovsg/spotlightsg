import React, { useMemo, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import _ from 'lodash'

type SearchProps = {
  onSearch: (search: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const onSearchThrottled = useMemo(() => _.throttle(onSearch, 300), [onSearch])
  const [search, setSearch] = useState('')

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="tel"
        placeholder="Search..."
        value={search}
        onChange={(event) => {
          const val = event.target.value
          setSearch(val)
          onSearchThrottled(val)
        }}
      />
    </InputGroup>
  )
}

export default Search
