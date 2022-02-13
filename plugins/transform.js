export default function SimpleModule(moduleOptions) {
  // Write your code here
  this.nuxt.hook("webpack:config", webpackConfigs => {

  });

  this.nuxt.hook("build:compile", ({ name, compiler }) => {

  });
}

export function postTransformNode(node) {
  console.log("transfom node start");
  if (node.attrs) {
    node.attrs = node.attrs.filter(({ name }) => name !== "data-test");
  }

  if (Array.isArray(node.children)) {
    node.children.map(postTransformNode);
  }
}
