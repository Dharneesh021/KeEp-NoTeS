import Feed from "./Feed"


const Home = ({posts,setPosts,fetchErrors , isLoading}) => {
  return (
    <div className="Home">

    {isLoading && <p className="statusMsg"style={{color:'GrayText', marginTop:'10rem', fontSize:'2rem', textAlign:'center'}}>Loading Posts...</p> }
    {!isLoading && fetchErrors && <p className="statusMsg" style={{color:'red', marginTop:'10rem', fontSize:'2rem', textAlign:'center'}}>{fetchErrors}</p> }

    {!fetchErrors && !isLoading && <main className="Home">
        {posts.length ? 
            <Feed 
              posts={posts}
              setPosts={setPosts}
            />
        : <p style={{color:'red', marginTop:'7rem', fontSize:'2rem', textAlign:'center'}}>There is no Post</p> }
    </main>}


    </div>
  )
}

export default Home