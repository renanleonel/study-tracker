export function Navbar(){
    return(
        <nav className="flex items-center justify-between flex-wrap bg-zinc-900 bg-opacity-40 rounded-md p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-xl">study tracker</span>
            </div>

            <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
                <div className="text-sm sm:flex-grow">
                <a
                    href="#"
                    className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4"
                >
                    Home
                </a>
                <a
                    href="#"
                    className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white"
                >
                    Configurações
                </a>
                </div>
                <div>
                <a
                    href="#"
                    className="inline-block text-sm px-4 py-2 leading-none rounded text-white mt-4 md:mt-0"
                    >Renan</a
                >
                </div>
            </div>
        </nav>
    )
}