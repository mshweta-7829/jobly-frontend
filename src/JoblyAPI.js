import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //Company Methods

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies by handle.
   * returns -> [ { handle, name, description, numEmployees, logoUrl }, ...] 
   */

  static async getCompanies() {
    const res = await this.request(`companies/`);
    return res.companies;
  }

  /** Get all matched companies 
   * {searchData: {minEmployees, maxEmployees and  nameLike}} (will find case-insensitive, partial matches)
   * returns -> [ { handle, name, description, numEmployees, logoUrl }, ...] 
   */

  static async searchCompanies(searchData) {
    const res = await this.request(`companies/`, searchData);
    return res.companies;
  }

  /** Patch a company (identified by handle) 
   * {updateData: {name, description, numEmployees, logo_url}}
   * 
   * returns -> { handle, name, description, numEmployees, logo_url }
   */

  static async updateCompany(handle, updateData) {
    const res = await this.request(`companies/${handle}`, updateData, "patch");
    return res.company;
  }

  /** Delete a company 
   * returns ->  { deleted: handle }
   */

  static async deleteCompany(handle) {
    const res = await this.request(`companies/${handle}`, method="delete");
    return res.deleted;
  }


  //Job Methods

  /**Get all jobs 
   * returns -> [ { id, title, salary, equity, companyHandle, companyName }, ...]
  */
  static async getJobs() {
    const res = await this.request('jobs/');
    return res.jobs
  }

  /** Get all matched jobs by searchData Obj
   *    {searchData: {minSalary, hasEquity and title}} 
   * (searchData properties are optional)
   * returns -> [ { id, title, salary, equity, companyHandle, companyName }, ...]
   */

  static async searchJobs(searchData) {
    const res = await this.request(`jobs/`, searchData);
    return res.jobs;
  }

  /**Get a specific Job object based on job id
   * returns -> { id, title, salary, equity, company }
 *    where company is { handle, name, description, numEmployees, logoUrl }
   */
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job
  }

  /** Patch a job (identified by id) 
   * Update parameters: {updateData: { title, salary, hasEquity }}
   * 
   * returns -> { id, title, salary, equity, companyHandle }
   */
  static async updateJob(id, updateData) {
    const res = await this.request(`jobs/${id}`, updateData, 'patch');
    return res.job
  }

  /**Delete Job
   * returns -> job name
   */
  static async deleteJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }


  // Auth Methods

  /**Register a User
   * params: Object of userData
   *  e.g. { username, password, firstName, lastName, email }
   * returns -> JWT token which can be used to authenticate further requests
   */
  static async registerUser(userData){
    const res = await this.request(`auth/register`, userData, "post");
    return res.token
  }

  /**User Login
   * params: Object of userData
   *  e.g. { username, password }
   * returns -> JWT token which can be used to authenticate further requests
   */
  static async loginUser(userData){
    const res = await this.request(`auth/token`, userData, "post");
    return res.token
  }

   // User Methods

  /**Register a Admin
   * params: Object of adminData
   *  e.g. { username, password, firstName, lastName, email }
   * returns -> {
   *            user: { username, firstName, lastName, email, isAdmin }, 
   *            token : ""
   *            }
   */
  static async registerAdmin(adminData){
    const res = await this.request(`users/`, adminData, "post");
    return res
  }

  /** Get all Users
   *
   * Returns list of all users.
   */
  static async getUsers(){
    const res = await this.request(`users/`);
    return res.users
  }

  /** Get a User
   * params:username
   *
   * Returns { username, firstName, lastName, isAdmin, jobs }
   * where jobs is { id, title, companyHandle, companyName, state }
   */
  static async getUser(username){
    const res = await this.request(`users/`, username);
    return res.users
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi
