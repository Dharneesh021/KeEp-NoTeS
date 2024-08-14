import { createContext } from "react"
// import PostLayout from "../PostLayout";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import api from '../api/posts'
// import EditPost from "../EditPost";
import useWindowSize from "../Hooks/useWindowSize";
import useAxiosFetch from "../Hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ({Children}) => {
      
  const[posts , setPosts] = useState([])

  const [search , setSearch] = useState('')
  const [postTitle , setPostTitle] = useState('')
  const [postBody , setPostBody] = useState('')
  const [searchResult , setSearchResult] = useState([])
  // const [fetchError , setFetchError] = useState(null)
  const [editTitle , setEditTitle] = useState('')
  const [editBody , setEditBody] = useState('')
  const navigate = useNavigate();
  const {width} = useWindowSize();
  const {data , isLoading , fetchErrors} = useAxiosFetch('http://localhost:4000/posts')


  // Fetch Data

  useEffect(()=>{
    setPosts(data)
  }, [data])

  // useEffect(()=>{
  //   const fetchPosts = async()=>{
  //     try{
  //       const response = await api.get('posts')
  //       setPosts(response.data)
  //       setFetchError(null)
  //     }catch(err){
  //       setFetchError(err.message)
  //     }
  //   }
  //   fetchPosts()
  // },[])

  useEffect(() => {
    const filter = posts.filter((elements) => 
      (((elements.title).toUpperCase()).includes(search.toUpperCase())) ||
      (((elements.body).toUpperCase()).includes(search.toUpperCase()))
    );

    setSearchResult(filter.reverse())
  }, [posts , search])


  const handleSubmit = async(e) => {
    e.preventDefault()
    const idNum = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    // console.log(typeof(idNum),idNum)
    const id = idNum.toString()
    console.log(typeof(id),id)
    const datetime = format(new Date() , 'MMM dd, yyyy pp')
    const listItems = { id , title: postTitle , datetime , body: postBody}
    const list = await api.post('/posts' , listItems)
    const allPosts = [...posts , list.data]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleEdit = async(id)=>{
    const datetime = format(new Date() , 'MMM dd, yyyy pp')
    const updateItems = { id , title: editTitle , datetime , body: editBody}
    try{
      const response = await api.put(`/posts/${id}`, updateItems)
      setPosts(posts.map((element)=> element.id===id ? {...response.data} : element))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      // console.log(typeof(id) , id); // Should log 'number'
      await api.delete(`/posts/${id}`);
      const list = posts.filter((element) => element.id !== id);
      setPosts(list);
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };
  

    return(
        <DataContext.Provider value={{
            width, search , setSearch , searchResult,setPosts,fetchErrors , isLoading , postBody , setPostBody , postTitle , setPostTitle , handleSubmit, editTitle , editBody , setEditTitle , setEditBody , handleEdit ,handleDelete
        }}>
            {Children}
        </DataContext.Provider>
    )
}

export default DataContext;