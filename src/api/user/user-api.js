import api from "../api";
import { exibirMensagem } from "@/actions";

function obterPaginado(pagina, tamanho) {
  return new Promise((resolve, reject) => {
    return api
      .get("/usuario", { params: { pagina: pagina, tamanho: tamanho } })
      .then((response) => resolve(response))
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function cadastrar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    return api
      .post("/usuario", usuario)
      .then((response) => resolve(response))
      .catch((error) => {
        if (error.response.data.erros) {
          var msg = "Verifique os campos: ";
          error.response.data.erros.forEach((erro) => {
            msg += erro.campo + ", ";
          });

          exibirMensagem(msg.substring(0, msg.length - 2), "error");
        }
        reject(error);
      });
  });
}

function atualizar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    return api
      .put(`/usuario`, usuario)
      .then((response) => resolve(response))
      .catch((error) => {
        if (error.response.data.erros) {
          var msg = "Verifique os campos: ";
          error.response.data.erros.forEach((erro) => {
            msg += erro.campo + ", ";
          });

          exibirMensagem(msg.substring(0, msg.length - 2), "error");
        }
        reject(error);
      });
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
  obterPaginado,
  cadastrar,
  atualizar,
  deletar,
  redefinirSenha,
};
