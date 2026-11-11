import { useEffect, useState } from "react";

import type { ApiResult } from "<%= scope %>/shared";
import { Button, Card } from "<%= scope %>/ui";

interface HelloData {
  greeting: string;
}

export default function App() {
  const [greeting, setGreeting] = useState("Loading…");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/hello?name=<%= projectName %>")
      .then((res) => res.json())
      .then((json: ApiResult<HelloData>) => setGreeting(json.data.greeting))
      .catch(() => setGreeting("Cannot reach the API; run pnpm dev --filter=api first"));
  }, []);

  return (
    <main className="app">
      <h1><%= projectName %></h1>
      <Card title="Message from apps/api">
        <p>{greeting}</p>
      </Card>
      <Card title="Component from <%= scope %>/ui">
        <Button onClick={() => setCount((value) => value + 1)}>Clicks: {count}</Button>
      </Card>
    </main>
  );
}
