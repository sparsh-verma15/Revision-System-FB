import React from 'react'
import './CCard.css'
import { Button } from 'react-bootstrap'
import { axiosInstance } from '../../api/api'

const CCard = (props) => {

    

  return (
    <>
        <div className='cardContainer'>
            <div className='w-100 d-flex justify-content-center align-items-center h-100 text-center'>
                <div>{props.heading}</div>
            </div>
        </div>
    </>
  )
}

export default CCard