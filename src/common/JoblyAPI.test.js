import JoblyApi from "./JoblyAPI.js"


  test("get a company", async function () {
    
    const company = await JoblyApi.getCompany("companies/bauer-gallagher")
    expect(company).toEqual(
      {
        "handle": "arnold-berger-townsend",
        "name": "Arnold, Berger and Townsend",
        "description": "Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.",
        "numEmployees": 795,
        "logoUrl": null
      }
    );
  });

