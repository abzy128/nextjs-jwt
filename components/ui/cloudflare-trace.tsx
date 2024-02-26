import { useState } from "react";
import { Button } from "./button";
const endpointURL = "https://1.1.1.1/cdn-cgi/trace";
interface Trace {
  fl: string;
  h: string;
  ip: string;
  ts: string;
  visit_scheme: string;
  uag: string;
  colo: string;
  silver: string;
  http: string;
  loc: string;
  tls: string;
  sni: string;
  warp: string;
  gateway: string;
  rbi: string;
  kex: string;
}
export default function CloudflareTrace() {
  const [trace, setTrace] = useState<Trace | null>(null);
  async function getTrace() {
    let data = await fetch("https://1.1.1.1/cdn-cgi/trace").then((res) =>
      res.text()
    );
    let arr = data
      .trim()
      .split("\n")
      .map((e) => e.split("="));
    setTrace(Object.fromEntries(arr));
  }
  return (
    <>
      <div>
        <Button
          className="p-4"
          onClick={async () => {
            await getTrace();
          }}
        >
          Get IP trace
        </Button>
        <div>
          <p>Your netork stats:</p>
          <p>Public IP address: {trace?.ip}</p>
          <p>User-Agent: {trace?.uag}</p>
          <p>From: {trace?.loc}</p>
          <p>IATA location code: {trace?.colo}</p>
        </div>
      </div>
    </>
  );
}
