import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
       
<section className="pt-24 bg-white">
<div className="px-12 mx-auto max-w-7xl">
    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
       <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-gray-400 to-gray-700 lg:inline">AIMUN</span> <span>x</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-700 to-blue-300 lg:inline">MUNITY</span>
        </h1>
        <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
        Collaboration in tech partnerships unlocks limitless possibilities for advancement        </p>
        <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Link to="/register"><button className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
               Regsiter
                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button></Link>
            
            
        </div>
    </div>
    <div className="w-full mx-auto mt-20 text-center md:w-10/12">
        <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center flex-none px-4 bg-blue-400 rounded-b-none h-11 rounded-xl">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
            </div>
        </div>
    </div>
</div>
</section>
    )
}

export default Hero