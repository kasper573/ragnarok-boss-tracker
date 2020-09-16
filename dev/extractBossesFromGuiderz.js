// Run this in the console when signed into your guiderz.com mvp tracker
JSON.stringify(
  $("div[id^='divMvpNameContainer-']")
    .toArray()
    .map((node) => {
      const match = /<b>(.*?)<\/b>.*\((.*?)\).*Spawn Time: (\d+)~(\d+)/.exec(
        node.innerHTML
      );
      const spawnCooldown = parseInt(match[3], 10);
      const spawnWindow = parseInt(match[4], 10) - spawnCooldown;
      return {
        name: match[1],
        map: {
          name: match[2],
          imageUrl: `http://guiderz.com/images/maps/${match[2]}.jpg`,
        },
        spawnCooldown,
        spawnWindow,
      };
    })
);
