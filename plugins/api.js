import createRepository from "@/api/Repository.js";
import publicApi from "@/api/public";
import alarm from "@/api/alarm";

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios);
  const repositories = {
    events: repositoryWithAxios("events"),
    configs: repositoryWithAxios("configs")
  };
  inject("publicApi", publicApi(ctx.$axios));
  inject("alarm", alarm(ctx.$axios));

};
