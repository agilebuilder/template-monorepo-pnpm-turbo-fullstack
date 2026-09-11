import { useEffect, useState } from "react";

import type { ApiResult } from "<%= scope %>/shared";
import { Button, Card } from "<%= scope %>/ui";

interface HelloData {
  greeting: string;
}

export default function App() {
  const [greeting, setGreeting] = useState("加载中…");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/hello?name=<%= projectName %>")
      .then((res) => res.json())
      .then((json: ApiResult<HelloData>) => setGreeting(json.data.greeting))
      .catch(() => setGreeting("无法连接 API，请先运行 pnpm dev --filter=api"));
  }, []);

  return (
    <main className="app">
      <h1><%= projectName %></h1>
      <Card title="来自 apps/api 的消息">
        <p>{greeting}</p>
      </Card>
      <Card title="来自 <%= scope %>/ui 的组件">
        <Button onClick={() => setCount((value) => value + 1)}>点击次数：{count}</Button>
      </Card>
    </main>
  );
}
