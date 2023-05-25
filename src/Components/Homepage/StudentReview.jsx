import React from 'react'

const StudentReview = () => {
    return (
        <>
        
        <div className='container my-12 mx-auto shadow-sm rounded-lg bg-gradient-to-r from-gray-50 via-almost-white to-gray-50'>

            <div className=' text-center '>
                <span className="inline-block p-3 mt-20 w-80 rounded-lg bg-gradient-to-r from-purple-600  to-blue-300 text-white  font-bold text-xl mx-auto">
                    <h1>User Reviews</h1>
                </span>
            </div>

            <div className=" container mt-16 justify-center  mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full p-6">
                    <div className=" mt-10 relative max-w-md mx-auto">
                        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                <h1 className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-green-600 rounded hover:bg-yellow-600">4 out of 5</h1>
                            </div>

                            <div className="mt-2">
                                <a href="/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0">Zeal college</a>
                                <p className="mt-2 text-gray-600 hover:text-indigo-200 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                            </div>

                            <div className="flex justify-between mt-4">

                                <div className="flex">
                                    <h2 className="font-bold text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 cursor-pointer dark:text-gray-200" >Tuiyo Ghung</h2>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className=" mt-10 relative max-w-md mx-auto shadow-sm border">
                        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                <h1 className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-green-600 rounded hover:bg-yellow-600">4.5 out of 5</h1>
                            </div>

                            <div className="mt-2">
                                <a href="/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0">Singhad college</a>
                                <p className="mt-2 text-gray-600 hover:text-indigo-200 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                            </div>

                            <div className="flex justify-between mt-4">

                                <div className="flex">
                                    <h2 className="font-bold text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 cursor-pointer dark:text-gray-200" >Guiter Guite</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className=" mt-10 relative max-w-md mx-auto shadow-sm border-sm border-black">
                        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
                                <h1 className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-green-600 rounded hover:bg-yellow-600">3 out of 5</h1>
                            </div>

                            <div className="mt-2">
                                <a href="/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabIndex="0">Government college</a>
                                <p className="mt-2 text-gray-600 hover:text-indigo-200 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                            </div>

                            <div className="flex justify-between mt-4">

                                <div className="flex">
                                    <h2 className="font-bold text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 cursor-pointer dark:text-gray-200" >Nyver Bolan</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
           
        </>
    )
}

export default StudentReview