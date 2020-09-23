// TODO extract all items from:
// https://github.com/rathena/rathena/blob/master/db/re/item_db.txt
// https://github.com/rathena/rathena/edit/master/db/re/mob_db.txt
import { ItemId } from "../state/ItemId";

export const items = {
  616: {
    id: 616 as ItemId,
    name: "Old Card Album",
    icon: require("../assets/items/616.gif"),
  },
};
