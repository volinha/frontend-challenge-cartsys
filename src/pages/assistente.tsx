import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { decrementPage, finishBuy, incrementPage, updateCity, updateComplement, updateNeighborhood, updateNumber, updateParcels, updatePaymentMethod, updateSelectedClientCode, updateSelectedProductCode, updateStreet } from "./slices/assistenteSlice";
import { CreditCard, DotsThreeCircle, Money } from "@phosphor-icons/react";
import { PurchaseState, addPurchase, updateProductSearch, updateSearchInput } from "./slices/listSlice";

import { NumericFormat } from "react-number-format";
import { setStatus } from "./slices/statusSlice";

export default function Assistant() {

    const productList = useSelector((state: RootState) => state.list.products);
    const searchProductList = useSelector((state: RootState) => state.list.productSearch);
    const clientList = useSelector((state: RootState) => state.list.clients);

    const selectedClientCode = useSelector((state: RootState) => state.assistant.selectedClientCode);
    const selectedProductCode = useSelector((state: RootState) => state.assistant.selectedProductCode);
    const selectedPaymentMethod = useSelector((state: RootState) => state.assistant.paymentMethod);
    const selectedParcels = useSelector((state: RootState) => state.assistant.parcels);

    const searchInput = useSelector((state: RootState) => state.list.searchInput);

    const street = useSelector((state: RootState) => state.assistant.street);
    const number = useSelector((state: RootState) => state.assistant.number);
    const neighborhood = useSelector((state: RootState) => state.assistant.neighborhood);
    const city = useSelector((state: RootState) => state.assistant.city);
    const complement = useSelector((state: RootState) => state.assistant.complement);

    const screen = useSelector((state: RootState) => state.assistant.screen);

    const paymentMethodList = [
        {
            code: 1,
            name: 'Crédito',
            icon: <CreditCard size={32} color="#fef6f6" />
        },
        {
            code: 2,
            name: 'Débito',
            icon: <CreditCard size={32} color="#fef6f6" />
        },
        {
            code: 3,
            name: 'Dinheiro',
            icon: <Money size={32} color="#fef6f6" />
        },
        {
            code: 4,
            name: 'Outros',
            icon: <DotsThreeCircle size={32} color="#fef6f6" />
        }
    ]

    const screenList = [1, 2, 3];

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
            /* console.log(newParcels); */

            dispatch(updateParcels(newParcels));
        }
    }

    const handleSelectPaymentMethod = (code: number) => {
        if (code === selectedPaymentMethod) { code = -1 }
        dispatch(updatePaymentMethod(code));
    }

    const handlePurchase = () => {
        if (selectedClientCode && selectedProductCode && selectedPaymentMethod) {
            const selectedClient = clientList.find(client => client.code === selectedClientCode);
            const selectedProduct = productList.find(product => product.code === selectedProductCode);

            if (selectedClient && selectedProduct) {
                const newPurchase: PurchaseState = {
                    client: selectedClient,
                    product: selectedProduct,
                    address: {
                        street: street,
                        number: number,
                        neighborhood: neighborhood,
                        city: city,
                        complement: complement
                    },
                    totalPrice: selectedProduct.price
                };
                /* console.log(newPurchase) */
                dispatch(addPurchase(newPurchase));
                dispatch(setStatus({ isActive: true, message: "Compra realizada com sucesso!", type: "alert" }))
                dispatch(finishBuy());
            }
        } else {
            console.log("Preencha todas as informações necessárias");
        }
    }

    const dispatch = useDispatch();

    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-68px)] gap-4 bg-slate-600 rounded-t text-white">
            <div className="flex flex-col w-screen min-h-full gap-4 p-4 rounded-t bg-slate-600">
                <div className="flex items-center justify-around w-full gap-10 text-white">
                    {screenList.map((screenNumber, index) => (
                        <span key={index} className={`px-2 border rounded-full aspect-square ${screenNumber === screen ? "bg-white text-black" : ""}`}>{screenNumber}</span>
                    ))}
                </div>
                {screen === 1 &&
                    <>
                        <div className="w-full">
                            Cliente
                            <select
                                className="w-full p-2 mt-2 text-black rounded"
                                value={selectedClientCode ? selectedClientCode : ""}
                                onChange={(e) => {
                                    const selectedCode = e.target.value;
                                    const selected = clientList.find((client) => client.code === parseInt(selectedCode));
                                    if (selected) {
                                        dispatch(updateSelectedClientCode(parseInt(selectedCode)));
                                    }
                                }}
                            >
                                <option value="">Selecione um cliente</option>
                                {clientList.map((client, index) => (
                                    <option key={index} value={client.code}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        Produto
                        <input
                            className="w-full p-2 text-black rounded"
                            type="search"
                            placeholder="Procure um produto"
                            value={searchInput}
                            onChange={(e) => {
                                dispatch(updateSearchInput(e.target.value));
                                dispatch(updateProductSearch());
                            }}
                        />
                        <div className="grid grid-cols-4 gap-2">
                            {(searchInput ? searchProductList : productList).map(product => (
                                <div
                                    key={product.code}
                                    className={`relative flex flex-col p-2 rounded min-w-[10rem] aspect-square items-center justify-between hover:bg-slate-400 cursor-pointer 
                                ${selectedProductCode === product.code ? "border bg-slate-500 border-slate-300" : "bg-slate-700"}`}
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
                            ))}
                            {searchInput && searchProductList.length === 0 && <div>A busca não retornou resultados.</div>}
                        </div>
                    </>
                }
                {screen === 2 &&
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                        <div className="flex items-center gap-2 justify-evenly">
                            {paymentMethodList.map(paymentMethod => (
                                <div
                                    key={paymentMethod.code}
                                    className={`flex flex-col items-center justify-center w-40 gap-2 p-4 cursor-pointer rounded aspect-square 
                                        ${paymentMethod.code === selectedPaymentMethod ? "border border-slate-300 bg-slate-600" : "bg-slate-700"}    `}
                                    onClick={() => handleSelectPaymentMethod(paymentMethod.code)}
                                >
                                    {paymentMethod.icon}
                                    <span>{paymentMethod.name}</span>
                                </div>
                            ))}
                        </div>
                        {selectedPaymentMethod === 1 &&
                            <div className="w-full">
                                Parcelamento
                                <select
                                    className="w-full text-black"
                                    value={selectedParcels.length > 0 ? selectedParcels[0].number : ""}
                                    onChange={(e) => {
                                        const selectedNumber = parseInt(e.target.value, 10);
                                        const selectedParcel = selectedParcels.find(parcel => parcel.number === selectedNumber);
                                        if (selectedParcel) {
                                            dispatch(updateParcels([selectedParcel]));
                                        }
                                    }}
                                >
                                    <option value="">Selecione o parcelamento</option>
                                    {selectedParcels.map((parcel, index) => (
                                        <option key={index} value={parcel.number}>
                                            {parcel.number}x de R${parcel.total.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                    </div>
                }
                {screen === 3 &&
                    <div className="flex items-center justify-center w-full ">
                        {/* form de endereço e finalizar compra */}
                        <form action="" className="flex flex-col gap-2">
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="rua" className="text-white">Rua</label>
                                <input
                                    id="rua"
                                    type="text"
                                    placeholder="Ex: Rua das Flores"
                                    className="p-2 text-black rounded"
                                    value={street}
                                    onChange={(e) => dispatch(updateStreet(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="bairro" className="text-white">Bairro</label>
                                <input
                                    id="bairro"
                                    type="text"
                                    placeholder="Ex: Centro"
                                    className="p-2 text-black rounded"
                                    value={neighborhood}
                                    onChange={(e) => dispatch(updateNeighborhood(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="numero" className="text-white">Número</label>
                                <input
                                    id="numero"
                                    type="number"
                                    placeholder="Ex: 110"
                                    className="p-2 text-black rounded"
                                    value={number}
                                    onChange={(e) => dispatch(updateNumber(parseInt(e.target.value, 10)))}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="cidade" className="text-white">Cidade</label>
                                <input
                                    id="cidade"
                                    type="text"
                                    placeholder="Ex: São Paulo"
                                    className="p-2 text-black rounded"
                                    value={city}
                                    onChange={(e) => dispatch(updateCity(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-2">
                                <label htmlFor="complemento" className="text-white">Complemento</label>
                                <input
                                    id="complemento"
                                    type="text"
                                    placeholder="Ex: Casa, Ap. 102"
                                    className="p-2 text-black rounded"
                                    value={complement}
                                    onChange={(e) => dispatch(updateComplement(e.target.value))}
                                />
                            </div>
                        </form>
                    </div>
                }
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={() => dispatch(decrementPage())}
                        disabled={screen === 1}
                        className="p-2 rounded bg-slate-500 hover:bg-slate-400 disabled:bg-slate-700 disabled:text-white/50">
                        Anterior
                    </button>
                    {
                        screen !== 3
                            ?
                            <button
                                className="p-2 rounded bg-slate-500 hover:bg-slate-400 disabled:bg-slate-700 disabled:text-white/50"
                                disabled={
                                    ((screen === 1) && (selectedProductCode < 0 || !selectedClientCode))
                                    ||
                                    (screen === 2 && (!selectedPaymentMethod))
                                }
                                onClick={() => dispatch(incrementPage())}>
                                Próximo
                            </button>
                            :
                            <button
                                className="p-2 rounded bg-slate-500 hover:bg-slate-400 disabled:bg-slate-700 disabled:text-white/50"
                                disabled={!street || !neighborhood || !number || !city}
                                onClick={() => handlePurchase()}>
                                Finalizar
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

// todo: add tailwind clsx 