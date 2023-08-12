import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateIsActive, updateName, updateDescription, updatePrice, updateStock, resetForm, ProductState } from "./slices/produtoSlice";
import { useEffect, useState } from "react";

export default function Products() {

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');

        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setNewProduct(parsedProducts);
        }
    }, []);

    const code = useSelector((state: RootState) => state.product.code);
    const isActive = useSelector((state: RootState) => state.product.isActive);
    const name = useSelector((state: RootState) => state.product.name);
    const description = useSelector((state: RootState) => state.product.description);
    const price = useSelector((state: RootState) => state.product.price);
    const stock = useSelector((state: RootState) => state.product.stock);

    const [newProduct, setNewProduct] = useState<ProductState[]>([]);
    const [productList, setProductList] = useState<ProductState[]>([]);

    function addProduct(product: ProductState) {
        newProduct.push(product);

        localStorage.setItem('products', JSON.stringify(newProduct));
        dispatch(resetForm());
    }

    const clearProducts = () => {
        localStorage.clear();
        setProductList([]);
    }

    const dispatch = useDispatch();

    return (
        <div className="min-h-screen flex items-center justify-center gap-4">
            <div className="flex flex-col gap-4 rounded p-4 bg-slate-600">
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-white">Código</label>
                        <input
                            id="code"
                            type="text"
                            placeholder="Código"
                            className="p-2 rounded"
                            value={code}
                            onChange={(e) => dispatch(updateCode(parseInt(e.target.value, 10)))}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 mt-4">
                        <label htmlFor="isActive" className="text-white">Ativo?</label>
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={isActive}
                            onChange={(e) => dispatch(updateIsActive(e.target.checked))}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-white">Nome</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nome"
                        className="p-2 rounded"
                        value={name}
                        onChange={(e) => dispatch(updateName(e.target.value))}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="text-white">Descrição</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Descrição"
                        className="p-2 rounded"
                        value={description}
                        onChange={(e) => dispatch(updateDescription(e.target.value))}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-white">Preço</label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Preço"
                        className="p-2 rounded"
                        value={price}
                        onChange={(e) => dispatch(updatePrice(parseFloat(e.target.value)))}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="stock" className="text-white">Quantidade em estoque</label>
                    <input
                        id="stock"
                        type="text"
                        placeholder="Quantidade em estoque"
                        className="p-2 rounded"
                        value={stock}
                        onChange={(e) => dispatch(updateStock(parseInt(e.target.value, 10)))}
                    />
                </div>

                <button
                    className="p-2 mt-2 rounded bg-white text-slate-600 font-bold"
                    onClick={() => addProduct({ code, isActive, name, description, price, stock })}
                >Adicionar
                </button>
                <button
                    className="p-2 mt-2 rounded bg-white text-slate-600 font-bold"
                    onClick={() => clearProducts()}
                >Limpar dados
                </button>
            {productList.map((product, index) => (
                <div key={index}>{JSON.stringify(product)}</div>
            ))}
            </div>
        </div>
    )
}

//TODO: add labels