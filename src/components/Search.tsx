import React from 'react'
import "../app/styles/search.scss"

const Search = ({search,setSearch,onSubmit}:{
  search:string;
setSearch:(type:string)=>void;
onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void
}) => {
  const onInputChange =((e:React.ChangeEvent<HTMLInputElement>)=>{
   
setSearch(e.target.value)
  })
  return (
    <div className='search-container'>
      <h1>Photo Gallery - Unsplash</h1>
      <form action=""onSubmit={(e)=>onSubmit(e)} >
      <h4>Image Search:</h4>
        <input  type="text" value={search} onChange={(e)=>{onInputChange(e)}}/>
      </form>
    </div>
  )
}

export default Search