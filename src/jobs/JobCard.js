import React from 'react';
import JoblyAPI from '../common/JoblyAPI';
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

  return (
    <div className='JobCard'>
      <h3>{job.title}</h3>
      {job.companyName ? <h2>{job.companyName}</h2> : null}
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  )
}

export default JobCard;