export const revalidate = 60;
// false | 0 | number

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import WorldRendererComponent from "@/components/world/WorldRenderer";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  

  
  const page = searchParams.page ? parseInt( searchParams.page ): 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });
  
  
  if (products.length === 0) {
    redirect('/');
  }

  
  return (
    <>
    <Title 
    title="Mapa"
    subtitle="AV. AVELLANEDA"
    className="mb-2"
    />
    <div className="flex justify-center max-w-[1280px] w-full font-normal mr-4">
    <WorldRendererComponent/>
    </div>
    

   </>
  );
}
