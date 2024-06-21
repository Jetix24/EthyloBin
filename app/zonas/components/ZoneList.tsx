"use client";
import { useState } from "react";
import Modal from "@/components/Modal";


const ZoneList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Imprimir el valor de isModalOpen
    console.log('isModalOpen:', isModalOpen);

    return (
        <>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Crear nueva zona">
                <form>
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" />
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new product
                        </button>
                    </div>
                </form>
            </Modal>
            <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200">
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Zonas
                        </div>
                    </div>
                    
                    <div onClick={() => setIsModalOpen(true)} className="btn btn-primary">Add Zone</div>
                </div>
            </aside>
        </>
    );
}

export default ZoneList;
