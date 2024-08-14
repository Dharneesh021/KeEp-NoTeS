import React from 'react'


const NewPost = ({postBody , setPostBody , postTitle , setPostTitle , handleSubmit}) => {


  return (
    <main className='NewPost'>
      <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label htmlFor="title">Title :</label>
          <input
             type="text"
             id='title'
             placeholder='Enter the title'
             value={postTitle}
             onChange={(e) => setPostTitle(e.target.value)} />
          <label htmlFor="body">Post :</label>
          <textarea
             id='body'
             placeholder='Enter the content'
             value={postBody}
             onChange={(e) => setPostBody(e.target.value)} />
             <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost