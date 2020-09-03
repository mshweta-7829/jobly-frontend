import React from 'react';
import JoblyAPI from '../apis/JoblyAPI';
import CurrUserContext from "../common/CurrUserContext";

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
  console.log(job, "job")
  return (
    <div className='JobCard card'>
      <div className="card-body">
        <h6 className="card-title">{job.title}</h6>
        {job.companyName ? <h2>{job.companyName}</h2> : null}
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity}</p>
      </div>
    </div>
  )
}

export default JobCard;