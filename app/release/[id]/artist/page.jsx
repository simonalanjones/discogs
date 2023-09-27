import Image from "next/image";
import Link from "next/link";
export default async function ArtistDetails({ params }) {
  console.log(params);

  const id = params.id;
  const res = await fetch(
    `https://api.discogs.com/releases/${id}?key=uBGppqJzNdMCeHPuCXLr&secret=nuBwpaLGoMFEQQOUwCQEMqfUFlmdxieD`
  );
  const release = await res.json();
  const numberOfKeys = Object.keys(release).length;

  if (numberOfKeys < 2) {
    return null;
  }

  const artist_url = release.artists[0].resource_url;
  const artist = await fetch(
    `${artist_url}?key=uBGppqJzNdMCeHPuCXLr&secret=nuBwpaLGoMFEQQOUwCQEMqfUFlmdxieD`
  );
  const artist_info = await artist.json();

  // console.log(artist_info.profile);
  const members = artist_info.members;
  const images = artist_info.images;

  const ImageGallery = ({ images }) => {
    return (
      <div className="container grid grid-cols-3 gap-2 mx-auto">
        {images.map((image, index) => (
          <div className="w-full rounded" key={index}>
            <Image
              priority
              src={image.uri}
              alt={`Image ${index}`}
              width={350}
              height={350}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <p>
        <Link href={`/release/${id}`}>Back to release</Link>
      </p>
      <h1 className="text-4xl mb-6 mt-6">{artist_info.name}</h1>
      <p>{artist_info.profile}</p>
      <ul>
        {artist_info.members.map((member) => (
          <li key={member.id}>
            <strong>{member.name}</strong>
          </li>
        ))}
      </ul>
      <ImageGallery images={images} />
    </main>
  );
}
