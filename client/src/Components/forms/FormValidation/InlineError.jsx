import React from 'react'

const InlineError = (error) => {
  return (
    <p className='error'>
      {error.error}
    </p>
  )
}

export default InlineError
