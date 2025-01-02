import { Fragment } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Dialog, Transition } from '@headlessui/react';
import { usarPresupuesto } from '../hooks/usePresupuesto';
import FormularioGasto from './FormularioGasto';

//Este codigo permite agregar nuevos gastos, es la logica del "+" en la parte inferior derecha

export default function ModalGasto() {

    const { estado, despachar } = usarPresupuesto();

    return (
        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => despachar({ type: 'mostrar-modal' })}
                >
                    <PlusCircleIcon className='w-16 h-16 text-green-600 rounded-full' />
                </button>
            </div>

            <Transition appear show={estado.modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => despachar({ type: 'cerrar-modal' })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <FormularioGasto />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
