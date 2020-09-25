class APIHandler {
    constructor (baseURL) {
      this.baseURL = baseURL;
    }
  
    getSelectedTags (data) {
      return axios.get("/tags", {params : {id_tags : data}});
    }
  
    getSelectedTagsGender (gender, data) {
        return axios.get(`/tags/${gender}`, {params : {id_tags : data}});
      }
  }
  
  export default APIHandler;

