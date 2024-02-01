import { SousDomaine } from "./sous-domaine";

export interface DomainePrincipal {
  nom: string,
  sousDomaines: SousDomaine[];
}
