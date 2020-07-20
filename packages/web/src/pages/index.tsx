import React from "react";

import { useHelloQuery } from "../../generated";

export default function Home() {
  const { data, loading } = useHelloQuery();

  if (loading) {
    return <span>please wait...</span>;
  }

  return <span>{data?.hello}</span>;
}
