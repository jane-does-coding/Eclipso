export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("query") || "self-improvement";
	const apiKey = "46210d785f5542eb93d9a36188ca8a70";

	try {
		const res = await fetch(
			`https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&apiKey=${apiKey}`
		);
		if (!res.ok) throw new Error("Failed to fetch articles");

		const data = await res.json();
		const articles = data.articles.map((article) => ({
			title: article.title,
			url: article.url,
		}));

		return Response.json(articles);
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Failed to load articles" }, { status: 500 });
	}
}
