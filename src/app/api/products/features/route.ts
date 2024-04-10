import data from '../data.json'
export async function GET() {
  const featuresProducts = data.products.filter((product) => product.featured)
  return Response.json(featuresProducts)
}
