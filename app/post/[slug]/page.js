import Link from "next/link";
import { Suspense } from "react";

async function getPosts() {
  const query = `
  {
    posts(first: 5) {
      nodes {
        title
        content
        uri
      }
    }
  }
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}


const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <div key={post.uri} className="card">
          <Suspense fallback={<Skeleton />}>
            <Link href={`/post/${post.uri}`}>
              <h3>{post.title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 200) + "...",
                }}
              />
            </Link>
          </Suspense>
        </div>
      ))}
    </div>
  );
}
