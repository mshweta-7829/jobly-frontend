import React, { useEffect, useState } from 'react';
import JoblyAPI from '../common/JoblyAPI';
import CompanyCard from './CompanyCard'
import SearchForm from '../common/SearchForm'

/**Display list of company cards and searchbar (to filter displayed companies) 
 * 
 * Props: 
 * 
 * 
 * State:
 * -None
 * 
 * Routes (/companies) -> CompanyList -> CompanyCard
*/
function CompanyList() {
  const [searchFilters, setSearchFilters] = useState({});

  useEffect(function fetchCompaniesOnRender() {
    console.log('in useEffect');
    async function fetchCompanies() {
      const companies = await JoblyAPI.getOrSearchCompanies(searchFilters);
      console.log('companies in useEffect', companies);
      console.log('companies[0]', companies[0]);
      renderCompanies(companies);
    }
    fetchCompanies();
  }, [searchFilters]);


  function addSearchFilters(formData) {
    setSearchFilters(formData)
  }

  function renderCompanies(companies) {
    console.log('in renderCompanies');
    return (
      <div>
        {/* <CompanyCard company={companies[0]} /> */}
        {companies.map(company => (
        <CompanyCard company={company} key={company.handle} />))}
      </div>
    )
  }



  return(
    <div className='CompanyList'>
      <SearchForm name='name' 
                  addSearchFilters={addSearchFilters}
          />
      {/* <CompanyCard company={{'handle': 1, name: 'asdf', description: 'jl;k'}}/> */}
    </div>
  )
}

export default CompanyList;