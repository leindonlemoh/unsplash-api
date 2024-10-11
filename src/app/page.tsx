'use client'
import React,{useState,useEffect} from "react";
import Search from "@/components/Search";
import Gallery from "@/components/Gallery";
import Modal from "@/components/Modal";
import './styles/global.css';

import axios from "axios";
import Loading from "@/components/Loading";
interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    small: string;
  };
  alt_description: string;
  width: number;
  height: number;
}
export default function Home() {
  const [search,setSearch]=useState('')
  const [isOpen,setIsOpen]=useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isNextLoading,setIsNextLoading] = useState(false)
  const [isSelected,SetIsSelected]=useState(0)
  const [results,setResults]=useState<UnsplashImage[]>([])
  const[isNull,setIsNull]=useState(false)


  const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();

 const response = await axios.get(`https://api.unsplash.com/search/photos`,
        {
          headers:{
            Authorization: 'Client-ID MkQhJo4Dd8RXbeBIEwW9he7sE_uwgpqBpkgSg_u9vzs',
          },
          params:{
            query:search,
            per_page:30
          }
        }
      )
      setIsNull(false)
      if (response.data.results.length == 0) {
        setIsNull(true)
      }
      console.log(response.data.results)
      setResults(response.data.results)
      setIsLoading(true)
  }

  const load=()=>{
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 1 second timer

      return () => clearTimeout(timer); // Cleanup on unmount
    }
    console.log(isLoading,"is is")
}

  useEffect(()=>{

load()
  },[isLoading])
  return (
    <div>
      <div className="hide-show">
        {isOpen ? 
      <Modal  SetIsOpen={setIsOpen} results={results} isSelected={isSelected} SetIsSelected={SetIsSelected}
      isNextLoading={isNextLoading}
setIsNextLoading={setIsNextLoading}
      />
      : <></>
    }
      </div>
<Search search={search} setSearch={setSearch} onSubmit={onSubmit}/>
{isLoading  ?
<Loading/>
:

(!isNull ? (<Gallery results={results} SetIsOpen={setIsOpen} SetIsSelected={SetIsSelected} 
isLoading={isLoading} 

/>)
:
(<div style={{display:'flex',justifyContent:'Center',marginTop:'50px',width:'100%', height:'90vh'}}>
  <div>
    <h1>

  0 Results
    </h1>
  </div>
  </div>
))
}


    </div>
  );
}
