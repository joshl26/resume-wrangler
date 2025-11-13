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

  // Quick validation: ensure quotes are balanced on each value (if a value starts with a quote it must end with same quote)
  for (const line of frontMatterLines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // If value starts with a quote but does not end with the same quote => treat frontmatter as malformed
    if (
      (value.startsWith('"') && !value.endsWith('"')) ||
      (value.startsWith("'") && !value.endsWith("'"))
    ) {
      // Malformed frontmatter — return defaults
      return { metadata: defaultMetadata, content };
    }

    // Remove surrounding quotes if present
    value = value.replace(/^['"](.*)['"]$/, "$1");

    // Unescape any escaped quotes inside the value (e.g. \" => ")
    value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");

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

  // Accept both .mdx and .md (case-insensitive)
  const validExts = new Set([".mdx", ".md"]);
  return fs
    .readdirSync(dir)
    .filter((file) => validExts.has(path.extname(file).toLowerCase()));
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function extractTweetIds(content: string): string[] {
  // Match <StaticTweet id="123" />  or <StaticTweet id='123'/> or <StaticTweet id="123"></StaticTweet>
  const regex = /<StaticTweet\s+[^>]*id=(?:'|")([0-9]+)(?:'|")[^>]*\/?>/g;
  const matches = [...content.matchAll(regex)];
  return matches.map((m) => m[1]).filter((id): id is string => !!id);
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
