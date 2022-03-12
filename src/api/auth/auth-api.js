import api from "../api";
import utilsTripleDES from "@/utils/tripleDes";

function logar(usuario) {
  usuario = usuario || {};
  return new Promise((resolve, reject) => {
    let usuarioSenha = JSON.stringify({
      username: usuario.login,
      password: usuario.senha,
    });

    let user = utilsTripleDES.Encrypt(usuarioSenha);
    let bodyFormData = new FormData();
    bodyFormData.append("user", user);

    return api
      .post("/auth/token", bodyFormData)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function refresh(usuario, token, refreshToken) {
  return new Promise((resolve, reject) => {
    var bodyFormData = new FormData();

    bodyFormData.append("username", usuario.nome);
    bodyFormData.append("token", token);
    bodyFormData.append("refreshToken", refreshToken);

    return api
      .post("/auth/refresh-token", bodyFormData)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function deslogar() {
  return new Promise((resolve, reject) => {
    return api
      .delete("/auth/logout")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

function ping() {
  return new Promise((resolve, reject) => {
    return api
      .get("/auth/ping")
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export default {
  refresh,
  ping,
  logar,
  deslogar,
};
