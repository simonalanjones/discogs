import Link from "next/link";
import fsPromises from "fs/promises";
import path from "path";
import Image from "next/image";

export async function getStaticProps() {
  const releases = await getReleases();
  return {
    props: { releases },
  };
}

async function getReleases() {
  const filePath = path.join(process.cwd(), "_data/discogs.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return objectData.releases;
}

export default async function ReleaseList() {
  const releases = await getReleases();

  return (
    <>
      <div class="grid grid-cols-1 grid-rows-1 md:grid-cols-3 gap-12">
        {releases.map((release) => (
          <div key={release.id} className="pb-8 pr-8">
            <Link href={`/release/${release.id}`}>
              <Image
                priority
                src={release.basic_information.cover_image}
                height={244}
                width={244}
                alt=""
                className="pb-3"
              />
            </Link>
            <h2>{release.basic_information.artists[0].name}</h2>
            <h3>{release.basic_information.title}</h3>
          </div>
        ))}
      </div>
      {releases.length === 0 && <p>There is no music to show!</p>}
    </>
  );
}
