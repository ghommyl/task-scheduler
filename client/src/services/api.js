import axios from "axios";

export function getTasks() {
  return axios
    .get("/api/get-tasks")
    .then((response) => {
      console.log(response.data);
      return response.data["tasks"].map((task) => {
        task["show_description"] = Boolean(task["show_description"]);
        task["show_end_date"] = Boolean(task["show_end_date"]);
        return task;
      });
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export function modifyTaskTo(updated) {
  return axios.put("/api/update-task", updated).catch((err) => {
    console.error(err);
  });
}

export function deleteTaskId(id) {
  return axios.delete(`/api/delete-task/${id}`).catch((err) => {
    console.error(err);
  });
}

export function addEmptyTask() {
  return axios
    .post("/api/add-task")
    .then((response) => {
      return response.data["id"];
    })
    .catch((err) => {
      console.error(err);
    });
}
