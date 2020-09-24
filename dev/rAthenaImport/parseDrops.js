exports.parseDrops = (mobTableData) =>
  mobTableData.reduce((allDrops, mob) => {
    const mobId = parseInt(mob.ID, 10);
    const mobDrops = allDrops[mobId] || (allDrops[mobId] = []);
    pushDrops(
      mobDrops,
      parseDrop(mob.MVP1id, mob.MVP1per, true),
      parseDrop(mob.MVP2id, mob.MVP2per, true),
      parseDrop(mob.MVP3id, mob.MVP3per, true)
    );
    for (const nr of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      pushDrops(mobDrops, parseDrop(mob[`Drop${nr}id`], mob[`Drop${nr}per`]));
    }
    pushDrops(mobDrops, parseDrop(mob.DropCardid, mob.DropCardper));
    return allDrops;
  }, {});

const pushDrops = (existingDrops, ...newDrops) =>
  // Omit null item drops
  existingDrops.push(...newDrops.filter((drop) => drop.item !== 0));

const parseDrop = (id, chance, mvp) => ({
  item: parseInt(id, 10),
  chance: parseFloat(chance) / 100 / 100,
  mvp,
});
