declare module "*.css";
declare module "*.css?shadow" {
  const content: string;
  export default content;
}

declare module "bpmn-js-token-simulation";
declare module "bpmn-js-token-simulation/lib/viewer";
