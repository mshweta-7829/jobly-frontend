import React, { useState } from 'react';

/**Renders search form
 * 
 * Props:
 * - addSearchFilters (updates state in parent)
 * 
 * State:
 * -formData
 * 
 * { CompanyList, JobsList } -> SearchForm
 */

function SearchForm(props) {
  const [formData, setFormData] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.addSearchFilters(formData);
    setFormData({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text'
        name={props.name}
        value={formData.name}
        placeholder='Enter a search term...'
        onChange={handleChange}
      />
      <button>Search</button>
    </form>
  )
}

export default SearchForm

 