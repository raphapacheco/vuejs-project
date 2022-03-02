class UsuarioModel {
  constructor(obj) {
    obj = obj || {};
    this.id = obj.id;
    this.nome = obj.nome;
    this.login = obj.login;
    this.email = obj.email;
    this.senha = obj.senha;
    this.cpf = obj.cpf;
    this.cnpj = obj.cnpj;
    this.celular = obj.celular;
    this.criadoEm = obj.criadoEm;
    this.atualizadoEm = obj.atualizadoEm;
    this.ativo = obj.ativo;
  }

  modeloValido() {
    return !!(
      this.nome &&
      this.email &&
      this.senha &&
      this.celular &&
      (this.cpf || this.cnpj)
    );
  }
}

module.exports = UsuarioModel;
