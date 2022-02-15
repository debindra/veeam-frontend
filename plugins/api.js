import createRepository from "@/api/Repository.js";
import publicApi from "@/api/public";
import alarm from "@/api/alarm";
import policy from "@/api/policy";
import agent from "@/api/agent";
import server from "@/api/server";
import company from "@/api/company";

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios);
  const repositories = {
    events: repositoryWithAxios("events"),
    configs: repositoryWithAxios("configs")
  };
  inject("publicApi", publicApi(ctx.$axios));
  inject("alarm", alarm(ctx.$axios));
  inject("policy", policy(ctx.$axios));
  inject("server", server(ctx.$axios));
  inject("company", company(ctx.$axios));

};
