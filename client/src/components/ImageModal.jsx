import React from "react";

export default function Modal(props) {
    const { character, handleDelete } = props
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <button
                className="text-white font-bold rounded transition ease-in-out delay-150 duration-150 ..."
                type="button"
                onClick={() => setShowModal(true)}
            >
                <img className="h-20" src={require("../images/combo_imgs/" + character.race.toLowerCase() + "-" + character.class.toLowerCase() + ".jpg")} alt="Character" />
            </button>
            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none" onClick={() => setShowModal(false)}
                    >
                        <div className="relative w-auto max-w-3xl mx-auto my-6">
                            {/*content*/}
                            <img className="max-h-screen" src={require("../images/combo_imgs/" + character.race.toLowerCase() + "-" + character.class.toLowerCase() + ".jpg")} alt="Character" />
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    );
}