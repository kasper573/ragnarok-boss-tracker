import { assetUrl } from "./assetUrl";
import { MapId } from "../state/MapId";

export const mapImageUrl = (id: MapId) => assetUrl(`maps/${id}.jpg`);
