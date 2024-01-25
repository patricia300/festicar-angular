import { LieuCovoiturage } from "./lieu-covoiturage";

export interface PointPassageCovoiturages {
  id: number,
  differenceHeurePassage: number,
  prix: number,
  lieuCovoiturage: LieuCovoiturage,
}
