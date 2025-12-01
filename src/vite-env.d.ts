/// <reference types="vite/client" />

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
