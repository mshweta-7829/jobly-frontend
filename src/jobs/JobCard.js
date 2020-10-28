import React from 'react';

/**Display JobCard
 * Details the 
 * 
 * Props:
 * - job {id, title, salary, equity, companyHandle}
 * 
 * State:
 * - None
 * 
 * JobCardList -> JobCard
 */
function JobCard({ job }) {
  return (
    <div className='JobCard card'>
      <div className="card-body">
        <h6 className="card-title">{job.title}</h6>
        {job.companyName ? <h2>{job.companyName}</h2> : null}
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity ? job.equity : 0}</p>
      </div>
    </div>
  )
}

export default JobCard;