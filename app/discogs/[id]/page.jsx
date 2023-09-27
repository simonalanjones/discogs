import Image from "next/image";
import Link from "next/link";

async function getRelease(id) {
  //6279933
  const res = await fetch(
    `https://api.discogs.com/releases/${id}?key=uBGppqJzNdMCeHPuCXLr&secret=nuBwpaLGoMFEQQOUwCQEMqfUFlmdxieD`
  );
  const release = await res.json();
  console.log("----------------");
  //console.log(release.images[0].uri);
  //console.log(release.tracklist);
  return release;
}

export default async function Release({ params }) {
  console.log(params);
  const release = await getRelease(params.id);

  const getTrackTitles = (tracklist) => {
    return tracklist.map((track) => track.title);
  };

  const TrackList = ({ release }) => {
    const trackTitles = getTrackTitles(release.tracklist);
    return (
      <div>
        <h2>List of Track Titles:</h2>
        <ul>
          {trackTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <main>
      <div>
        <Image
          priority
          src={release.images[0].uri}
          height={244}
          width={244}
          alt={`Album cover of '${release.title}' by ${release.artists[0].name}`}
        />
        <h2>{release.title}</h2>
        <h3>
          <Link href={`${params.id}/artist/`}>{release.artists[0].name}</Link>
        </h3>
        <p>{release.year}</p>
        <TrackList release={release} />
      </div>
    </main>
  );
}
