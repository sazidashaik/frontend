import http from "../http-common";
const getAll = () => {
  return http.get("/viewAll");
};
const get = feedBackId => {
  return http.get(`/${feedBackId}`);
};
const create = data => {
  return http.post("/", data);
};
const update = (feedBackId, data) => {
  return http.put(`/${feedBackId}`, data);
};
/*const remove = id => {
  return http.delete(`/feedback/${id}`);
};*/
/* any other service or queries or sorting or features which you want to add
const removeAll = () => {
  return http.delete(`/tutorials`);
};
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};*/
const FeedbackService = {
  getAll,
  get,
  create,
  update,
  //remove,
  //removeAll,
  //findByTitle
  //you can add more actions here
};
export default FeedbackService;