import React, { useEffect, useState } from 'react';
import JoblyAPI from '../common/JoblyAPI';
import CompanyCard from '../companies/CompanyCard'
import SearchForm from '../common/SearchForm'

/**Display list of company cards and searchbar (to filter displayed companies) 
 * 
 * Props: 
 * -currUser: {username, firstName, lastName, email}
 * 
 * State:
 * -None
 * 
 * Routes (/companies) -> CompanyList -> CompanyCard
*/
function CompanyList({ currUser }) {
  const [searchFilters, setSearchFilters] = useState({});

  useEffect(function fetchCompaniesOnRender() {
    async function fetchCompanies() {
      const companies = await JoblyAPI.getOrSearchCompanies(searchFilters);
      renderCompanies(companies);
    }
    fetchCompanies();
  }, [searchFilters]);


  function addSearchFilters(formData) {
    setSearchFilters(formData)
  }

  function renderCompanies(companies) {
    companies.map( (company, idx) =>(
      <CompanyCard company={company} key={idx} />
    ))
  }

  return(
    <div className='CompanyList'>
      <SearchForm name='name' 
                  addSearchFilters={addSearchFilters}
          />
    </div>
  )
}

export default CompanyList;