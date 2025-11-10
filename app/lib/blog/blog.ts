import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  // Defaults
  const defaultMetadata: Metadata = {
    title: "",
    publishedAt: "",
    summary: "",
  };

  if (!match) {
    // No frontmatter found — return defaults and full content
    return { metadata: defaultMetadata, content: fileContent.trim() };
  }

  const frontMatterBlock = match[1] ?? "";
  const content = fileContent.replace(frontmatterRegex, "").trim();

  const frontMatterLines = frontMatterBlock
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const metadataPartial: Partial<Metadata> = {};

  for (const line of frontMatterLines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // remove surrounding quotes
    if (
      key === "title" ||
      key === "publishedAt" ||
      key === "summary" ||
      key === "image"
    ) {
      metadataPartial[key as keyof Metadata] = value;
    }
  }

  const metadata: Metadata = {
    title: metadataPartial.title ?? defaultMetadata.title,
    publishedAt: metadataPartial.publishedAt ?? defaultMetadata.publishedAt,
    summary: metadataPartial.summary ?? defaultMetadata.summary,
    image: metadataPartial.image,
  };

  return { metadata, content };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file).toLowerCase() === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function extractTweetIds(content: string): string[] {
  const regex = /<StaticTweet\s+id=(?:["'])([0-9]+)(?:["'])\s*\/>/g;
  const matches = [...content.matchAll(regex)];
  // Filter out undefined values and ensure we only return strings
  return matches
    .map((match) => match[1])
    .filter((id): id is string => id !== undefined);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const tweetIds = extractTweetIds(content);
    return {
      metadata,
      slug,
      tweetIds,
      content,
    };
  });
}

export function getBlogPosts() {
  const contentDir = path.join(process.cwd(), "content");
  return getMDXData(contentDir);
}
