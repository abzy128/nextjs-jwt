const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
if (!GNEWS_API_KEY) {
    throw new Error("Please set GNEWS_API_KEY in your environment variables");
}
const newsURL = "https://gnews.io/api/v4"

export async function getNews() {
    const response = await fetch(`${newsURL}/top-headlines?apikey=${GNEWS_API_KEY}&lang=en&category=technology`);
    return response.json();
}