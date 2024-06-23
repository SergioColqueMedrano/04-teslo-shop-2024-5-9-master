export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { getResources } from "@/actions/get-resources";
import { auth } from "@/auth.config";
import { MessageDashboard, Pagination, ProductGrid, Title } from "@/components";
import TotalRecursos from "@/components/chat/totalRecursos";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function gender({ params, searchParams }: Props) {

  const session = await auth();

  if( !session?.user) {
    //redirect('/auth/login?returnTo=/perfil');
    redirect('/gender/men');
  }

  const { gender } = params;
  
  const page = searchParams.page ? parseInt( searchParams.page ): 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender, });
  
  
  if (products.length === 0) {
    redirect(`/gender/${ gender }`);
  }
  const resources = await getResources();

  const labels: Record<string, string> = {
    'men': 'Principal',
    'women': 'para Edificios',
    'kid': 'para Unidades',
    'unisex': 'para todos'
  }
  //if ( id === 'kids'){
  //  notFound();
  //}

  return (
    <>
    <Title 
    title={`Menu ${ labels[gender] }`}
    subtitle=''
    className="mb-2"
    />
    <TotalRecursos userId={(session.user.id)}  />
    <ProductGrid 
      products={ products }
    />

    <Pagination totalPages={totalPages}/>
    </>
  );
}