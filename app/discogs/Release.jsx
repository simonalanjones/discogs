async function getReleases() {
  const res = await fetch(`https://api.discogs.com/releases/6279933`);
  const release = await res.json();
  //console.log(release);
  return release;
}
