export default async function sitemap() {
  let routes = [
    "/",
    "/blog",
    "/contact",
    "/job-boards",
    "/login",
    "/register",
    "/resume-templates",
  ].map((route) => ({
    url: `${process.env.DEPLOYMENT_URL}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
