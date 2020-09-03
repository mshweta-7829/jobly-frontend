import React from 'react';
import JobCard from './JobCard';

/**Renders a list of Job Cards
 * 
 * Props:
 * -Jobs [{id, title, salary, equity, companyHandle}]
 * 
 * State:
 * -None
 * 
 * CompanyDetail -> JobCardList -> JobCard
 */
function JobCardList({ jobs }) {

  return (
    <div className='JobCardList'>
      {jobs.map( job => (
        <JobCard job={job} />
      ))}
    </div>
  )
}

export default JobCardList;