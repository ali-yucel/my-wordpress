import Link from "next/link";

async function getMenus() {
    const query = `
    {
        menus {
          nodes {
            id
            databaseId
            name
            menuItems {
              edges {
                node {
                  id
                  label
                  path
                  parentId
                }
              }
            }
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
    
    // Menüdeki ilk menü düğümünü döndürüyoruz
    return data.menus.nodes;
}

export default async function Header() {
    const menus = await getMenus();
    console.log(menus);

    return (
        <header id="header">
            <div className="container">
                <div className="flex">
                    <div className="flex-auto">
                        <Link href="/">Header!</Link>
                    </div>
                    <div className="flex-1">
                        <nav>
                            <ul className="flex justify-end">
                                {menus.map((menu) =>
                                    menu.menuItems.edges.map((item) => (
                                        <li className="mr-4 " key={item.node.id}>
                                            <Link href={item.node.path}>
                                                {item.node.label}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
