import React from 'react'

const Spinner = ({color}) => {
    return (
        <div id='spinner' class={`spinner-border text-${color}`} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner