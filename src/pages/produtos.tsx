import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateIsActive, updateName, updateDescription, updatePrice, updateStock, resetForm, ProductState, updateImage } from "./slices/produtoSlice";

import { addProduct, clearProductList } from "./slices/listSlice";
import { clearStatus, setStatus } from "./slices/statusSlice";

export default function Products() {
    const code = useSelector((state: RootState) => state.product.code);
    const isActive = useSelector((state: RootState) => state.product.isActive);
    const name = useSelector((state: RootState) => state.product.name);
    const description = useSelector((state: RootState) => state.product.description);
    const price = useSelector((state: RootState) => state.product.price);
    const stock = useSelector((state: RootState) => state.product.stock);
    const image = useSelector((state: RootState) => state.product.image);

    const productList = useSelector((state: RootState) => state.list.products)

    const inputClasses = 'p-2 rounded';

    function handleAddProduct(newProduct: ProductState) {
        const doesCodeExist = productList.find((product) => product.code === newProduct.code);

        if (!doesCodeExist) {
            dispatch(addProduct(newProduct));
            dispatch(setStatus({ isActive: true, message: 'Produto cadastrado com sucesso!', type: 'success' }))
            dispatch(resetForm());
        } else {
            dispatch(setStatus({ isActive: true, message: 'Código já existente!', type: 'error' }))
        }

        setTimeout(() => {
            dispatch(clearStatus());
        }, 5000);
    }

    function clearProducts() {
        dispatch(clearProductList());
        dispatch(resetForm());
    }

    const dispatch = useDispatch();

    return (
        <div className="flex items-start justify-between min-h-[calc(100vh-68px)] gap-4 bg-slate-600 rounded-t">
            <div className="flex flex-col w-screen min-h-full gap-4 p-4 rounded-t bg-slate-600">
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-white">Código</label>
                        <input
                            id="code"
                            type="text"
                            placeholder="Código"
                            className={inputClasses}
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
                        className={inputClasses}
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
                        className={inputClasses}
                        value={description}
                        onChange={(e) => dispatch(updateDescription(e.target.value))}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="price" className="text-white">Preço</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Preço"
                        className={inputClasses}
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
                        className={inputClasses}
                        value={stock}
                        onChange={(e) => dispatch(updateStock(parseInt(e.target.value, 10)))}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="image" className="text-white">Link da imagem</label>
                    <input
                        id="stock"
                        type="text"
                        placeholder="Ex: https://picsum.photos/200/300"
                        className={inputClasses}
                        value={image}
                        onChange={(e) => dispatch(updateImage(e.target.value))}
                    />
                </div>
                <div className="flex items-center justify-around">
                    <button
                        className="p-2 mt-2 font-bold bg-white rounded text-slate-600"
                        onClick={() => handleAddProduct({ code, isActive, name, description, price, stock, image })}
                    >Adicionar
                    </button>
                    <button
                        className="p-2 mt-2 font-bold bg-white rounded text-slate-600"
                        onClick={() => clearProducts()}
                    >Limpar dados
                    </button>
                </div>
                {/* {productList.map((product, index) => (
                    <div key={index}>{JSON.stringify(product)}</div>
                ))} */}
            </div>
        </div>
    )
}

//TODO: add remove products page/button