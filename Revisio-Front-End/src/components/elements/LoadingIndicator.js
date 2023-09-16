import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingIndicator = (props) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
        {props.text} <Spinner animation='border' size='sm'/>
    </div>
  )
}

export default LoadingIndicator