import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
//import utilsStorage from "@/utils/storage";
//import apiUsuario from "@/api/usuario/usuario-api";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Login") {
    next();
    return;
  }

  next({
    path: "/login",
    params: {
      nextUrl: to.fullPath,
    },
  });

  return;
  /*
  if (to.name == "Assinatura" || to.name == "Login") {
    next();
    return;
  }

  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = utilsStorage.obterTokenNaStorage();
    const refreshToken = utilsStorage.obterRefreshTokenNaStorage();
    const expiresIn = utilsStorage.obterExpiresInNaStorage();
    const usuario = utilsStorage.obterUsuarioNaStorage();

    //Se não estiver autenticado vai pro login
    if (!token) {
      next({
        path: "/login",
        params: {
          nextUrl: to.fullPath,
        },
      });
      return;
    }

    
    //Se o token expirou tenta o refresh
    if (Date.now() >= expiresIn * 1000) {
      
      apiUsuario
        .refresh(usuario, token, refreshToken)
        .then((response) => {
          utilsStorage.salvarAutenticacao(response.data);
        })
        .catch(() => {
          //Se não conseguiu fazer o refresh vai pro login
          utilsStorage.removerAutenticacao();
          next({
            path: "/login",
            params: {
              nextUrl: to.fullPath,
            },
            query: { exibirMensagemExpiracao: true },
          });
          return;
        });
    }

    
    //Caso esteja tudo ok vai pra rota selecionada pelo usuário
    next();
    return;
  }
  //Se o usuário voltou para a página e ainda possui um token válido vai pro dashboard
  next({ name: "Dashboard" });

  */
});

export default router;
