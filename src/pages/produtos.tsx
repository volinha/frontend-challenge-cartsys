import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, updateIsActive, updateName, updateDescription, updatePrice, updateStock, resetForm, ProductState, updateImage } from "../app/slices/produtoSlice";

import { addProduct, clearProductList } from "../app/slices/listSlice";
import { clearStatus, setStatus } from "../app/slices/statusSlice";

import { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Products() {

    const code = useSelector((state: RootState) => state.product.code);
    const isActive = useSelector((state: RootState) => state.product.isActive);
    const name = useSelector((state: RootState) => state.product.name);
    const description = useSelector((state: RootState) => state.product.description);
    const price = useSelector((state: RootState) => state.product.price);
    const stock = useSelector((state: RootState) => state.product.stock);
    const image = useSelector((state: RootState) => state.product.image);

    const status = useSelector((state: RootState) => state.status);

    const productList = useSelector((state: RootState) => state.list.products)

    const inputClasses = 'p-2 rounded min-w-screen w-full';
    const buttonClasses = 'p-2 rounded bg-slate-700 hover:bg-slate-400 text-white';

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

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        handleAddProduct({ code, isActive, name, description, price, stock, image })
    }

    function clearProducts() {
        dispatch(clearProductList());
        dispatch(resetForm());
    }

    const dispatch = useDispatch();

    return (
        <div className="flex items-start justify-center gap-4 rounded-t min-h-navbar bg-slate-600">
            <div className="flex flex-col w-screen min-h-full gap-4 p-4">
                <form 
                onSubmit={(e) => handleSubmit(e)} 
                className="flex flex-col items-start justify-between h-full gap-2 min-w-screen">

                    <label htmlFor="code" className="text-white">Código</label>
                            <input
                                id="code"
                                type="text"
                                placeholder="Código"
                                className={inputClasses}
                                value={code}
                                onChange={(e) => dispatch(updateCode(parseInt(e.target.value, 10)))}
                            />

			<label htmlFor="isActive" className="text-white">Ativo?</label>
                        <input
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                checked={isActive}
                                onChange={(e) => dispatch(updateIsActive(e.target.checked))}
                            />

                        <label htmlFor="name" className="text-white">Nome</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nome"
                            className={inputClasses}
                            value={name}
                            onChange={(e) => dispatch(updateName(e.target.value))}
                        />

                        <label htmlFor="description" className="text-white">Descrição</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Descrição"
                            className={inputClasses}
                            value={description}
                            onChange={(e) => dispatch(updateDescription(e.target.value))}
                        />

			<label htmlFor="price" className="text-white">Preço</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Preço"
                            className={inputClasses}
                            value={price}
                            onChange={(e) => dispatch(updatePrice(parseFloat(e.target.value)))}
                        />

			<label htmlFor="stock" className="text-white">Quantidade em estoque</label>
                        <input
                            id="stock"
                            type="text"
                            placeholder="Quantidade em estoque"
                            className={inputClasses}
                            value={stock}
                            onChange={(e) => dispatch(updateStock(parseInt(e.target.value, 10)))}
                        />

			<label htmlFor="image" className="text-white">Link da imagem</label>
                        <input
                            id="stock"
                            type="text"
                            placeholder="Ex: https://picsum.photos/200/300"
                            className={inputClasses}
                            value={image}
                            onChange={(e) => dispatch(updateImage(e.target.value))}
                        />
                    <button
                            className={buttonClasses + ' w-full mt-4'}
                            onClick={() => handleAddProduct({ code, isActive, name, description, price, stock, image })}
                        >Adicionar
                        </button>
                </form>
                <div className="flex items-center justify-center gap-4">
                    <Link to="/produtos/listar"
                        className={buttonClasses}
                    >
                        Listar produtos
                    </Link>
                    <button
                            className={buttonClasses}
                            onClick={() => clearProducts()}
                        >Limpar dados
                    </button>
                </div>
                {status.isActive &&
                    <div className={`flex items-center justify-center p-2 text-white rounded ${status.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
                        {status.message}
                    </div>
                }
            </div>
        </div>
    )
}

//TODO: add remove products page/button