import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'

async function getFeaturesProducts(): Promise<Product[]> {
  const responde = await api('/products/features', {
    // Tempo para busca novamente
    /*
    next: {
      revalidate: 60 * 60,
    },
    */
    cache: 'no-store',
  })

  const products = await responde.json()

  return products
}

export default async function Home() {
  const [highLightedProduct, ...otherProduct] = await getFeaturesProducts()

  return (
    <div className="grid max-h[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="relative col-span-6 group row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highLightedProduct.image}
          className="group hover:scale-105 transition-transform duration-500"
          width={860}
          height={860}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highLightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProduct.map((procuct) => {
        return (
          <Link
            key={procuct.id}
            href={`/product/${procuct.slug}`}
            className="relative col-span-3 group row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={procuct.image}
              className="group hover:scale-105 transition-transform duration-500"
              width={860}
              height={860}
              quality={100}
              alt=""
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{procuct.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {procuct.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
