import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";
import JoblyAPI from '../common/JoblyAPI'
import JobCardList from '../jobs/JobCardList'

function CompanyDetail(){
  const { companyName } = useParams();

  useEffect(function fetchCompanyOnRender() {
    async function fetchCompany() {
      const company = await JoblyAPI.getCompany(companyName);
      renderCompany(company)
    }
    fetchCompany();
  }, [companyName]);

  function renderCompany(company){

    return (
      <div className="CompanyDetail">
        <h2>company.name</h2>
        <p>company.description</p>
        <JobCardList jobs={company.jobs}/>
      </div>
    )
  }
}

export default CompanyDetail