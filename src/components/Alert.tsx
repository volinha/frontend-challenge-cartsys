import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { X } from "@phosphor-icons/react";
import { clearStatus } from "../pages/slices/statusSlice";
import { finishBuy } from "../pages/slices/assistenteSlice";

export default function Alert() {

  const status = useSelector((state: RootState) => state.status);
  const lastPurchase = useSelector((state: RootState) => state.list.purchases.slice(-1));

  const dispatch = useDispatch();

  const handleFinish = () => {
    dispatch(clearStatus())
    dispatch(finishBuy())
    window.location.replace("/home")
  }

  return (
    <>
      {status.isActive && status.type === 'alert' &&
        <div className='absolute z-20 w-full h-full backdrop-blur-sm bg-black/25' role='alert'>
          <button 
            onClick={() => handleFinish()}
            aria-label="Close alert"
            className="absolute top-0 right-0 z-20 flex items-center justify-center w-10 m-4 rounded-full aspect-square bg-white/25">
            <X size={32} color="#fef6f6" />
          </button>
          <div className='flex items-center justify-center w-full h-full gap-2'>
            <div className="flex flex-col gap-2 p-2 text-black rounded bg-slate-100">
              Compra efetuada com sucesso!
              <div>Produto: {lastPurchase[0].client.name}</div>
              <div>Nome: {lastPurchase[0].product.name}</div>
              <div>Valor: R${lastPurchase[0].totalPrice}</div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
