import React, { Suspense } from "react";
import ReleaseList from "./release/ReleaseList";
import Loading from "./loading";

export default function Releases() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ReleaseList />
      </Suspense>
    </main>
  );
}
