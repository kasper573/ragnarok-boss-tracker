// Inject JQuery into ratemyserver then paste this into console after enabling renewal

async function downloadMobId(name) {
  const html = await $.get(
    `https://ratemyserver.net/index.php?mob_name=${encodeURIComponent(
      name
    )}&page=mob_db&f=1&mob_search=Search`
  );
  const match = /Mob-ID#(\d+)/.exec(html);
  return match && match[1];
}

async function downloadMobIds(names) {
  const map = {};
  for (const name of names) {
    map[name] = await downloadMobId(name);
  }
  return map;
}

downloadMobIds(
  [] // Add mob names here
).then(console.log);
