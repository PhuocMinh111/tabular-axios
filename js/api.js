const URL = "https://62999bfc7b866a90ec3e95f3.mockapi.io/teachers/";
function Service() {
  this.getTeacherApi = function () {
    return axios({
      url: URL,
      method: "GET",
    });
  };
  this.delTeaacherApi = function (id) {
    return axios({
      url: URL + id,
      method: "delete",
    });
  };
  this.addApi = function (id, data) {
    if (!id)
      return axios({
        url: URL,
        data: data,
        mothod: "post",
      });
  };
}
