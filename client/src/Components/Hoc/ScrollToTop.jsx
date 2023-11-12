import React, { useEffect } from 'react'

const ScrollToTop = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return <WrappedComponent {...props} />  
  }
   
   
}

export default ScrollToTop
