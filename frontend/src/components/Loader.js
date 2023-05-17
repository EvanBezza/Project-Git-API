// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: Loader.js

import React from 'react'
import Loader from 'react-loader-spinner'
import '../style/loaderStyle.css'

function LoadingSpinner() {
  return (
    // Render a spinner for loading state
    <div>
      <section id="loaderSection">
        <div>
          <Loader
            type="Puff"
            color="#8F5BD9"
            height={100}
            width={100}
            timeout={3000} // Spinner will disappear after 3 seconds
          />
        </div>
      </section>
    </div>
  )
}

export default LoadingSpinner
