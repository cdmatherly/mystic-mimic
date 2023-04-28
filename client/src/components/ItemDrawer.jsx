import React from "react";

export default function Drawer({ children, isOpen, setIsOpen, }) {
    return (
        <main
            className={
                "overflow-hidden z-10 delay-400 duration-500 ease-in-out transition-all transform flex absolute right-0 -mr-12" +
                (isOpen ? " translate-x-0 " : " translate-x-full ")
            } style={{width: "350px"}}
        >
            <section
                className={"w-10 h-10 focus:text-3xl hover:text-3xl bg-gray-500 bg-gradient-to-r from-purple-500 to-sky-400 font-bold text-white text-lg border-l-2 border-t-2 border-b-2 border-black cursor-pointer left-0 text-center flex justify-center items-center"}
                onClick={() => {
                    setIsOpen(false);
                }}
            >X</section>
            <section
                className={
                    " w-fit max-w-fit right-0 bg-white h-full shadow-xl"
                }
            >
                <article className="relative right-0 w-fit pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
                    {children}
                </article>
            </section>
        </main>
    );
}