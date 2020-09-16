// Inject JQuery into ratemyserver then paste this into console after enabling renewal

async function downloadBossId (name) {
  const html = await $.get(`https://ratemyserver.net/index.php?mob_name=${encodeURIComponent(name)}&page=mob_db&f=1&mob_search=Search`);
  const match = /Mob-ID#(\d+)/.exec(html);
  return match && match[1];
}

async function downloadBossIds (names) {
  const map = {};
  for (const name of names) {
    map[name] = await downloadBossId(name);
  }
  return map;
}

downloadBossIds(
  [] // Add mob names here
).then(console.log);

