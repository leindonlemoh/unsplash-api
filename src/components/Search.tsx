import React from 'react'
import "../app/styles/search.scss"

const Search = ({search,setSearch,onSubmit}:{
  search:string;
setSearch:(type:any)=>void;
onSubmit:(e:any)=>void
}) => {
  const onInputChange =((e:any)=>{
    const {name,value}= e.target
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