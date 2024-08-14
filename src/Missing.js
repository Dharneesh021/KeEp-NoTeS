import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <br />
        <p>Well, that's disappointing.</p>
        <br />
        <Link to='/'>Visit our Home Page</Link>
    </main>
  )
}

export default Missing