import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import ProductCard from "../components/ProductCard";

export default function ListProducts() {
    const products = useSelector((state: RootState) => state.list.products);

    return (
        <div className="flex items-start justify-center gap-4 rounded-t min-h-navbar bg-slate-600">
            <div className="grid items-center justify-center w-screen min-h-full grid-cols-6 gap-4 p-4 rounded-t bg-slate-600">
                {products.map((product) => (
                    <ProductCard key={product.code} product={product} remove />
                ))}
            </div>
        </div>
    )
}
