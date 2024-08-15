import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';


const EditPost = ({posts , editTitle , editBody , setEditTitle , setEditBody , handleEdit}) => {


    const {id} = useParams();
    const element = posts.find((element)=> (element.id).toString() === id);

    useEffect(()=>{
        if(element){
            setEditTitle(element.title)
            setEditBody(element.body)
        }
    }, [element , setEditBody , setEditTitle])

  return (
    <main className='NewPost'>
    {editTitle && 
    <>
      <h2 className='edit'>Edit Post</h2>
        <form className='newPostForm' onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="PostTitle">Title :</label>
          <input
             type="text"
             id='PostTitle'
             placeholder='Enter the title'
             value={editTitle}
             onChange={(e) => setEditTitle(e.target.value)} />
          <label htmlFor="postBody">Post :</label>
          <textarea
             id='postBody'
             placeholder='Enter the content'
             value={editBody}
             onChange={(e) => setEditBody(e.target.value)} />
             <button type='submit' onClick={()=>handleEdit(element.id)}>Submit</button>
        </form>
    </>
    }
      {!editTitle &&
        <>
            <h2>Page Not Found</h2>
            <br />
            <p>Well, that's disappointing.</p>
            <br />
            <Link to='/'>Visit Home Page</Link>
        </>
      }
      
  </main>
  )
}

export default EditPost