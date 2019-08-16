
import React from 'react'

import './ErrorBoundary.scss'

const ErrorBoundary = props => (<div className='error-boundary'>
  <h1>{props.error.message}</h1>
</div>)

export default ErrorBoundary
