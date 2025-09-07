declare module "*.svg" {
  const src: string; // Vite returns a URL for the asset
  export default src;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}