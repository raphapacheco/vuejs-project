class UsuarioModel {
  constructor(obj) {
    obj = obj || {};
    this.id = obj.id;
    this.nome = obj.nome;
    this.login = obj.login;
    this.email = obj.email;
    this.senha = obj.senha;
    this.funcao = obj.funcao;
    this.perfil = obj.perfil;
    this.foto = obj.foto;
    this.idCliente = obj.idCliente;
    this.criadoEm = obj.criadoEm;
    this.atualizadoEm = obj.atualizadoEm;
  }

  modeloValido() {
    return !!(this.nome && this.email && this.senha && this.perfil);
  }
}

module.exports = UsuarioModel;
