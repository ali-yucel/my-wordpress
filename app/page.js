import Image from "next/image";
import Link from "next/link";

async function getPosts() {
    const query = `
  {
    posts(first: 10) {
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

export default async function PostList() {
    const posts = await getPosts();

    return (
        <div className="container">
            <div className="xl:mx-[200px]">
                {posts.map((post) => (
                    <Link key={post.uri} href={`post/${post.uri}`}>
                        <div
                            className="flex border-solid border-2 border-gray-200 hover:border-gray-500 p-[10px] rounded overflow-hidden shadow-lg mb-4  transition-all "
                        >
                            <div className="w-[200px] aspect-square">
                                <Image
                                    className="h-full object-cover"
                                    src="/card-top.jpg"
                                    width={200}
                                    height={200}
                                    alt={post.title}
                                />
                            </div>
                            <div className="w-full ml-5">
                                <div className="h-full flex flex-col justify-between">
                                    <div>
                                        <div className="font-bold text-xl mb-2">
                                            {post.title}
                                        </div>
                                        <p
                                            className="text-gray-700 text-base"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    post.content.slice(0, 200) +
                                                    "...",
                                            }}
                                        />
                                    </div>

                                    <div className="inline-block px-3 py-2 rounded-full bg-gray-200">
                                        devamı...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
