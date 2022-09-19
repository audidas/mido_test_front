import axios from "axios";

const instance = axios.create({});

export const Process = {
  getTree: () => instance.get("/visual/create-process-tree"),
  getList: () => instance.get("/api/list"),
  getDetail: (id) => instance.get(`/api/view?id=${id}`),
  createProcess: (data) => instance.post("/api/create", data),
  getFileContent: (src) =>
    instance.get(`/api/file?src=${encodeURIComponent(src)}`),
};
