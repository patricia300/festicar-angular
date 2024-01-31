import { AjoutArcticle } from "./article";

export interface PanierRequestBodyDto {
  emailFestivalier: string;
  articles: AjoutArcticle[];
}
