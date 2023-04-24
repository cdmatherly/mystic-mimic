import { Link } from 'react-router-dom';
const LandingPage = (props) => {
    return (
        <body className="min-h-screen py-16 bg-black">
            <div className="grid gap-8 items-start justify-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-sky-400 rounded-lg blur-lg "></div>
                    <div className=" relative max-w-full rounded overflow-hidden shadow-lg px-20 py-20 bg-no-repeat bg-cover" style={{
                        backgroundPosition: '50%',
                        backgroundImage: 'url("https://cdn.discordapp.com/attachments/1082784107844620441/1100153756479393803/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.png")',
                        height: '800px',
                        width: '1500px'
                    }}>
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)' }}>
                            <div className="flex justify-center items-center h-full">
                                <div className="text-center text-white px-6 md:px-12">
                                <h1 className="mb-4 text-3xl font-extrabold text-gray-500 md:text-6xl lg:text-8xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">Mystic</span> Mimic</h1>
                                    <h3 className="text-5xl  tracking-tight leading-tight mb-12">
                                        Are you ready <br /><span>for an adventure?</span>
                                    </h3>
                                    <Link path='/register'>
                                        <button type="button"
                                            className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                            data-mdb-ripple="true" data-mdb-ripple-color="light">
                                            Get started
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </body>
    )
}
export default LandingPage;