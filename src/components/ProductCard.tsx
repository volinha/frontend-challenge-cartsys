import { Trash } from "@phosphor-icons/react";
import { ProductState } from "../app/slices/produtoSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../app/slices/statusSlice";
import { RootState } from "../app/store";
import { NumericFormat } from "react-number-format";
import { updateParcels, updateSelectedProductCode } from "../app/slices/assistenteSlice";

export default function ProductCard({ product, remove, select }: { product: ProductState, remove?: boolean, select?: boolean }) {

    const dispatch = useDispatch();

    const selectedProductCode = useSelector((state: RootState) => state.assistant.selectedProductCode);
    const productList = useSelector((state: RootState) => state.list.products);

    const handleDeleteProduct = (productCode: number) => {
        dispatch(setStatus({ isActive: true, message: JSON.stringify(productCode), type: "delete_product" }))
    }

    const handleSelectProduct = (code: number) => {
        if (code === selectedProductCode) { code = -1 }
        dispatch(updateSelectedProductCode(code));
        const price = productList.find(product => product.code === code)?.price;

        if (price) {
            const newParcels: { number: number; total: number }[] = [];
            for (let i = 1; i <= 12; i++) {
                const total = price / i;
                newParcels.push({ number: i, total });
            }
            dispatch(updateParcels(newParcels));
        }
    }

    return (
        <div className={`relative text-white flex flex-col p-2 rounded min-w-[10rem] aspect-square items-center justify-between hover:bg-slate-500 cursor-pointer 
        ${(selectedProductCode === product.code) && (select) ? "border bg-slate-500 border-slate-300" : "bg-slate-700"}`}>
            <div
                key={product.code}
                
                onClick={() => handleSelectProduct(product.code)}
            >
                <img src={product.image ? product.image : "https://picsum.photos/200/300"} alt={product.name} className="object-none rounded aspect-video" />
                <div className="flex flex-col items-start justify-start p-2">
                    <span className="text-xl font-bold">{product.name}</span>
                    <span className="text-sm">
                        <NumericFormat value={product.price} displayType={'text'} thousandSeparator="," decimalSeparator='.' prefix={'R$'} />
                    </span>
                    <span>Estoque: {product.stock} un</span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {remove &&
                    <button
                    className="p-2 rounded-full bg-slate-700"
                    onClick={() => handleDeleteProduct(product.code)}>
                        <Trash size={24} color="#fef6f6" />
                    </button>}
            </div>
        </div>
    )
}