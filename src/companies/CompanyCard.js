import React from 'react';
import {Link} from 'react-router-dom'

/**Renders details of the company
 * 
 * Accepts props :
 *  - company = {handle, name, description, logoUrl}
 * CompanyList -> CompanyCard -> view (companyCard)
 */
function CompanyCard({ company }) {

  return (
    <Link className="CompanyCard" exact to={`/companies/${company.handle}`}>
      <div>
        <div>
          <h2>{company.name}</h2>
          <img src={company.logoUrl}></img>
        </div>
        <p>{company.description}</p>
      </div>
    </Link>
  )
}

export default CompanyCard