import { Navbar } from "@/components/navbar";
import { ProductListGroup } from "@/components/product-list-group";
import { notFound } from "next/navigation";

export default async function Home() {
  const categories = [
    {
      id: "1",
      slug: "sety",
      name: "Сеты",
      products: [
        {
          id: "1",
          name: "Сет 1",
          description:
            "Tempura łosoś 8 szt / Philadelphia classic 8 szt /  Serowa 8 szt / Midori z wędzonym łososiem 8 szt",
          imageUrl: "https://spokosushi.com/img/36363250.jpg",
          price: 135,
          ingredients: ["Ingredient 1", "Ingredient 2"],
        },
        {
          id: "2",
          name: "Product 2",
          imageUrl: "https://via.placeholder.com/150",
          price: 200,
          ingredients: ["Ingredient 3", "Ingredient 4"],
        },
      ],
    },
    {
      id: "2",
      slug: "category-2",
      name: "Category 2",
      products: [
        {
          id: "3",
          name: "Product 3",
          imageUrl: "https://via.placeholder.com/150",
          price: 300,
          ingredients: ["Ingredient 5", "Ingredient 6"],
        },
      ],
    },
    {
      id: "3",
      slug: "category-3",
      name: "Category 3",
      products: [
        {
          id: "4",
          name: "Product 4",
          imageUrl: "https://via.placeholder.com/150",
          price: 400,
          ingredients: ["Ingredient 7", "Ingredient 8"],
        },
      ],
    },
  ];

  if (!categories) {
    notFound();
  }

  return (
    <>
      <Navbar categories={categories} />
      {categories.map((category) => (
        <ProductListGroup key={category.id} category={category} />
      ))}
    </>
  );
}
