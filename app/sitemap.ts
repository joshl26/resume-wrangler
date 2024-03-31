export default async function sitemap() {

  let routes = ["", "/login", "/register"].map((route) => ({
    url: `${process.env.DEPLOYMENT_URL}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
