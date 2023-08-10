import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateIsActive, updateName, updateDescription, updatePrice, updateStock, resetForm } from "./slices/produtoSlice";

export default function Products() {

    const code = useSelector((state: RootState) => state.product.code);
    const isActive = useSelector((state: RootState) => state.product.isActive);
    const name = useSelector((state: RootState) => state.product.name);
    const description = useSelector((state: RootState) => state.product.description);
    const price = useSelector((state: RootState) => state.product.price);
    const stock = useSelector((state: RootState) => state.product.stock);

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
                    onClick={() => dispatch(resetForm())}
                >Salvar
                </button>
            </div>
        </div>
    )
}

//TODO: add labels