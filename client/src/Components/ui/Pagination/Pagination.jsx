import React from 'react'
import './pagination.scss'
const Pagination = ({ prev, next, page, totalPages }) => {
   const nextDisabled  = page === totalPages;
   const prevDisabled = page === 1;
   
   
    return (
        <div className='pagination__container'>
            <button disabled={prevDisabled} onClick={prev} className={prevDisabled ? `pagination__btn disabled` : `pagination__btn`}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={nextDisabled} onClick={next} className={nextDisabled ? 'pagination__btn disabled' : `pagination__btn`}>Next</button>
        </div>
    )
}

export default Pagination
