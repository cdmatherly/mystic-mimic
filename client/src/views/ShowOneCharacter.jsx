import charImg from '../images/bard_lute_char_img.jpeg';
import { useState, useParams } from 'react'
import Chat from '../components/Chat';

const ShowOneCharacter = (props) => {
    return (
        <div className="grid items-start justify-center gap-8">
            <div className="relative">
                <div className="absolute rounded-lg -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 blur-lg "></div>
                <div></div>
                <div className="relative max-w-full px-20 py-20 overflow-hidden bg-white rounded shadow-lg">
                    <div>
                        <img className="h-20" src={charImg} alt="Character"></img>
                        <div className="mb-6">
                            <label className="font-bold text-gray-500">
                                Character Name
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Strength:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>

                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Dexterity:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>

                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Constitution:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>

                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Wisdom:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>

                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Intelligence:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>

                        <div className="mb-6 md:items-center">
                            <div className="md:w-1/3">
                                <label className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0">
                                    Charisma:
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <p className="w-full px-4 py-4 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        {/* Bottom Left Column, On View One Character Page*/}
                        <div className='flex-auto p-3 mr-4 border-2 border-solid rounded'>
                            <div className="mb-6 align-middle md:items-center">
                                <div className="flex mb-3 place-content-center">
                                    <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                        Left Column Skill 1:
                                    </label>
                                    <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                </div>

                                <div className="flex mb-3 place-content-center">
                                    <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                        Left Column Skill 2:
                                    </label>
                                    <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                </div>

                                <div className="flex mb-3 place-content-center">
                                    <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                        Left Column Skill 3:
                                    </label>
                                    <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                </div>

                                <div className="flex mb-3 place-content-center">
                                    <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                        Left Column Skill 4:
                                    </label>
                                    <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                                </div>

                            </div>
                        </div>
                        <div className='flex-auto p-3 mr-4 border-2 border-solid rounded'>
                            <div className="flex mb-3 place-content-center">
                                <label className="block pr-4 mb-1 text-lg font-bold text-center text-gray-500 align-middle md:mb-0">
                                    Right Column Skill 1sadjkfdaskjsdafkajsdf:
                                </label>
                                <p className="px-4 py-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded">10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShowOneCharacter;