const mixinMensagem = {
  data() {
    return {
      mensagem: "",
      snackbar: false,
      timeout: 15000,
      tipo: "",
    };
  },
  methods: {
    dispararMensagem(mensagem, tipo, tempo) {
      this.tipo = tipo;
      this.mensagem = mensagem;
      this.snackbar = !this.snackbar;
      this.timeout = tempo || this.timeout;
    },
  },
};

export default mixinMensagem;
