import React, { Suspense } from "react";
import ReleaseList from "../release/ReleaseList";
import Loading from "../loading";

export default function Releases() {
  return (
    <main>
      <nav>
        <div>
          <h2>Releases</h2>
          <p>
            <small>My record collection</small>
          </p>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <ReleaseList />
      </Suspense>
    </main>
  );
}
