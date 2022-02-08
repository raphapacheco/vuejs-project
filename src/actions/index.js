import EventBus, { ACTIONS } from "../events/index";

export const exibirMensagem = (mensagem, tipo) => {
  EventBus.$emit(ACTIONS.SNACKBAR, mensagem, tipo);
};
