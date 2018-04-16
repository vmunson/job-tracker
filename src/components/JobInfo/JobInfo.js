import React from 'react'

import JobInput from './JobInput'
import JobTable from './JobTable'
import '../../App.css'

const JobInfo = (props) => {
    return (
        <div>
            <JobInput token={props.token} />
            <JobTable token={props.token} />
        </div>
    )
}



export default JobInfo