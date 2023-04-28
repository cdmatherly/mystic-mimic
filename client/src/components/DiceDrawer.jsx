import React from "react";

export default function Drawer({ children, isDiceOpen, setIsDiceOpen, diceRoll }) {
    return (
        <main
            className={
                "overflow-hidden z-10 delay-400 duration-500 ease-in-out transition-all transform flex fixed rounded-xl shadow shadow-slate-300 " +
                (isDiceOpen ? " -translate-y-full " : " translate-y-0 opacity-0")
            } style={{ width: "350px", bottom: '2.5rem', right: '6rem' }}
        >
            <section
                className={"w-full h-10 bg-slate-700 text-center bg-opacity-80 flex items-center justify-center " + (isDiceOpen && ' cursor-pointer')}
                onClick={() => {
                    setIsDiceOpen(false);
                }}
            ><p className="text-gray-300 font-bold text-xl">{diceRoll}</p></section>
            <section
                className={
                    " w-fit max-w-fit right-0 bg-white h-10 shadow-xl"
                }
            >
                <article className="relative right-0 w-fit pb-10 flex flex-col space-y-6 overflow-y-auto h-10">
                </article>
            </section>
        </main>
    );
}