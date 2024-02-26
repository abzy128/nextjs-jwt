import { Button } from "./button";
import { useState } from "react";
import Image from "next/image";
class NewsItem {
  constructor(
    public title: string,
    public description: string,
    public content: string,
    public url: URL,
    public image: URL,
    public publishedAt: Date
  ) {}
}
export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  async function getNews() {
    fetch("/api/news")
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });
  }
  return (
    <>
      <Button
        className="p-4"
        onClick={async () => {
          await getNews();
        }}
      >
        Get news
      </Button>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.publishedAt.toString()}</p>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.url}`}
              alt={item.title}
              width={150}
              height={150}
            ></Image>
          </li>
        ))}
      </ul>
    </>
  );
}
