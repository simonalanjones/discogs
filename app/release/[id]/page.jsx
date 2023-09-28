import Image from "next/image";
import Link from "next/link";
import fsPromises from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "_data/discogs.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  const data = objectData.releases.map((release) => ({
    id: release.id.toString(), // Convert id to string
  }));
  return data;
}

async function getRelease(id) {
  const res = await fetch(
    `https://api.discogs.com/releases/${id}?key=uBGppqJzNdMCeHPuCXLr&secret=nuBwpaLGoMFEQQOUwCQEMqfUFlmdxieD`
  );

  if (res.status !== 404) {
    const release = await res.json();
    return release;
  } else {
    notFound();
  }
}

export default async function Release({ params }) {
  const release = await getRelease(params.id);

  const getTrackTitles = (tracklist) => {
    return tracklist.map((track) => track.title);
  };

  const TrackList = ({ release }) => {
    const trackTitles = getTrackTitles(release.tracklist);
    return (
      <div>
        <h2>Track Titles:</h2>
        <ul>
          {trackTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    );
  };

  if (release)
    return (
      <main>
        <div className="mb-4">
          <h2 className="text-3xl font-bold">{release.title}</h2>
          <h3 className="text-xl">
            <Link href={`${params.id}/artist/`}>{release.artists[0].name}</Link>
          </h3>
          <small>
            {release.formats[0].name && <>{release.formats[0].name}, &nbsp;</>}
            {release.formats[0].text && <>{release.formats[0].text}, &nbsp;</>}
            {release.formats[0].descriptions.map(
              (name, index) =>
                name && (
                  <span key={index} className="">
                    {name}
                    {index === release.formats[0].descriptions.length - 1
                      ? "."
                      : ","}
                    &nbsp;
                  </span>
                )
            )}
          </small>
        </div>
        <div class=" gap-12">
          <Image
            className="mb-4"
            priority
            src={release.images[0].uri}
            height={344}
            width={344}
            alt={`Album cover of '${release.title}' by ${release.artists[0].name}`}
          />
          {/* <ul className="mb-5">
            {release.styles.map((style, index) => (
              <span
                key={index}
                class="mb-2 text-xs font-semibold inline-block py-1 px-2  rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1"
              >
                {style}
              </span>
            ))}
            {release.genres.map((genre, index) => (
              <span
                key={index}
                class="text-xs font-semibold inline-block py-1 px-2  rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1"
              >
                {genre}
              </span>
            ))}
          </ul> */}

          <div class="flex flex-col">
            <TrackList release={release} />
          </div>
        </div>
      </main>
    );
}
