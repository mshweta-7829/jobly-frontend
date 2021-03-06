import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import JoblyAPI from '../apis/JoblyAPI'
import JobCard from '../jobs/JobCard'

//TODO:ASK can we render view from useEffect

function CompanyDetail() {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchCompanyOnRender() {
    async function fetchCompany() {
      const company = await JoblyAPI.getCompany(companyName);
      setCompany(company)
      setIsLoading(false)
    }
    fetchCompany();
  }, [companyName]);

  function renderJobs() {
    const jobs = company.jobs

    return (
      <div>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    )
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {renderJobs()}
    </div>
  )

}

export default CompanyDetail