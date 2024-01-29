import { Article } from "./article";

export interface PanierRequestBodyDto {
  emailFestivalier: string;
  articles: Article[];
}
