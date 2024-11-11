"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useGetConversations from "@/hooks/useGetConversation";
import useConversation from "@/store/useConversation";

const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();
  const handleForm = (e) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3){
      return toast.error('Search term must be atleast 3 characters long.');
    }

    //implementing very basic Search Agorithm;

    const conversation  = conversations.find((c)=> c.username.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation);
      setSearch('');
    } else {
       return toast.error("No such user found");
    }
  }
  return (
    <form onSubmit={handleForm} className="flex items-center gap-2">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type = 'submit' className="btn btn-circle bg-sky-500 text-white">
            <FaSearch/>   
        </button>       
    </form>
  )
}

export default SearchInput
