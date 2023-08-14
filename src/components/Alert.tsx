import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { X } from "@phosphor-icons/react";
import { clearStatus } from "../app/slices/statusSlice";
import { finishBuy } from "../app/slices/assistenteSlice";
import { removeClient, removeProduct } from "../app/slices/listSlice";

export default function Alert() {

  const status = useSelector((state: RootState) => state.status);
  const lastPurchase = useSelector((state: RootState) => state.list.purchases.slice(-1));

  const dispatch = useDispatch();

  const handleDeleteClient = () => {
    dispatch(removeClient(parseInt(status.message, 10)));
    handleFinish();
  }

  const handleDeleteProduct = () => {
    dispatch(removeProduct(parseInt(status.message, 10)));
    handleFinish();
  }

  const handleFinishPurchase = () => {
    dispatch(finishBuy());
    handleFinish();
  }

  const handleFinish = () => {
    dispatch(clearStatus())
    if (window.location.href === '/assistente')
      window.location.replace("/home")
  }

  const buttonClasses = "bg-slate-500 rounded p-4 w-20 hover:bg-slate-400";

  return (
    <>
      {status.isActive && (status.type !== "error" || "success") &&
        <>
          <button
            onClick={() => handleFinishPurchase()}
            aria-label="Close alert"
            className="absolute top-0 right-0 z-50 flex items-center justify-center w-10 m-4 rounded-full aspect-square bg-white/25">
            <X size={32} color="#fef6f6" />
          </button>
          <div className='absolute z-40 w-full h-full backdrop-blur-sm bg-black/25' role='alert'>
            <div className='flex items-center justify-center w-full h-full gap-2'>
              <div className="flex flex-col gap-2 p-6 text-black rounded bg-slate-100">
                {status.isActive && status.type === 'alert' &&
                  <>
                    <span>{lastPurchase[0].client.name}, sua compra foi efetuada com sucesso!</span>
                    <div>Produto: {lastPurchase[0].product.name}</div>
                    <div>Data: {lastPurchase[0].client.email}</div>
                    <div>Valor: R${lastPurchase[0].totalPrice}</div>
                  </>
                }
                {status.isActive && status.type === 'delete_client' &&
                  <>
                    <div>Deseja remover o usuário {status.message}?</div>
                    <div>Essa ação não pode ser desfeita.</div>
                    <div className="flex items-center justify-center w-full gap-2 mt-2">
                      <button className={buttonClasses} onClick={() => handleDeleteClient()}>Sim</button>
                      <button className={buttonClasses} onClick={() => handleFinish()}>Não</button>
                    </div>
                  </>
                }
                {status.isActive && status.type === 'delete_product' &&
                  <>
                    <div>Deseja remover o produto {status.message}?</div>
                    <div>Essa ação não pode ser desfeita.</div>
                    <div className="flex items-center justify-center w-full gap-2 mt-2">
                      <button className={buttonClasses} onClick={() => handleDeleteProduct()}>Sim</button>
                      <button className={buttonClasses} onClick={() => handleFinish()}>Não</button>
                    </div>
                  </>

                }
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
