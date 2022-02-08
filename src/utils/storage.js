import UsuarioModel from "@/model/usuario-model";
import jwt_decode from "jwt-decode";

function obterUsuarioNaStorage() {
  var usuario = localStorage.getItem("usuario");

  if (usuario) {
    usuario = atob(usuario);
    return JSON.parse(usuario);
  }
  return undefined;
}

function obterTokenNaStorage() {
  return localStorage.getItem("token");
}

function obterExpiresInNaStorage() {
  return localStorage.getItem("token-expiresIn");
}

function obterRefreshTokenNaStorage() {
  return localStorage.getItem("refresh-token");
}

function salvarAutenticacao(token) {
  var decoded = jwt_decode(token.accessToken);
  var usuario = new UsuarioModel();

  usuario.id = decoded.nameid;
  usuario.login = decoded.unique_name;
  usuario.nome = decoded.Nome;
  usuario.email = decoded.Email;

  localStorage.setItem("usuario", btoa(JSON.stringify(usuario)));
  localStorage.setItem("token", token.accessToken);
  localStorage.setItem("refresh-token", token.refreshToken);
  localStorage.setItem("token-expiresIn", token.expiresIn);
}

function removerAutenticacao() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("token-expiresIn");
  localStorage.removeItem("usuario");
}

export default {
  salvarAutenticacao,
  removerAutenticacao,
  obterUsuarioNaStorage,
  obterTokenNaStorage,
  obterExpiresInNaStorage,
  obterRefreshTokenNaStorage,
};
