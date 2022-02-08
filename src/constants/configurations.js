"use strict";
const ACESSO = {
  LOCAL: "http://localhost:5000",
  HOMOLOGACAO: "http://hml_rt/api",
  PRODUCAO: "https://app_rt/api",
};

const URLS = {
  BASE: ACESSO.LOCAL,
  //BASE: ACESSO.HOMOLOGACAO
  //BASE: ACESSO.PRODUCAO
};

const TEMPO_ESPERA_PARA_PESQUISA_AUTOCOMPLETE = 1500;

const INPUT_KEY_CODES = {
  enter: 13,
};

export { INPUT_KEY_CODES, TEMPO_ESPERA_PARA_PESQUISA_AUTOCOMPLETE, URLS };
