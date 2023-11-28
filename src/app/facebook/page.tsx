"use client";

import { useRouter } from "next/navigation";

export default function Facebook() {
  const router = useRouter();

  return (
    <div>
      Facebook <button onClick={() => router.push("/")}>Back</button>
    </div>
  );
}
