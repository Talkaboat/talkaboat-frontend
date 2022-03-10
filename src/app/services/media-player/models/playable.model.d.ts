export interface Playable {
  id: number;
  title: string;
  publisher?: string;
  image: string;
  link?: string;
  description: string;
  audio: string;
  audio_length: number;
}
