import api from "../api";

function obterTodos() {
  return new Promise((resolve, reject) => {
    return api
      .get("/usuario")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function cadastrar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    return api
      .post("/usuario", usuario)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function atualizar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    return api
      .put(`/usuario/${usuario.id}`, usuario)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function deletar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    return api
      .delete(`/usuario/${usuario.id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function redefinirSenha(email) {
  return new Promise((resolve, reject) => {
    return api
      .post(`/usuario/redefinir-senha`, {
        email,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default {
  obterTodos,
  cadastrar,
  atualizar,
  deletar,
  redefinirSenha,
};
