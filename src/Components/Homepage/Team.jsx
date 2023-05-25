import React from 'react'

const Team = () => {
    return (
        <>
            <div className="py-20 ">
                <div className="container mx-auto px-6 md:px-12 xl:px-32">
                    <div className="mb-20 text-center ">
                        <h2 className="mb-4 mt-1 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-800 via-blue-200 to-purple-600 md:text-4xl">Meet the Team</h2>
                        <p className="text-gray-600 lg:w-8/12 lg:mx-auto">Keep Updated and Don't miss out anything !</p>
                    </div>
                    <div className="grid gap-12 items-center md:grid-cols-3">
                        <div className="space-y-4 text-center hover:opacity-70">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="man" loading="lazy" width="1000" height="667" />

                            <div>
                                <h4 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-indigo-200 to-purple-600 font-bold">Polaski Torata</h4>
                                <span className="block text-sm text-gray-500">CEO-Founder</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center hover:opacity-70">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-64"

                                src="https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80" alt="woman" loading="lazy" width="640" height="805" />
                            <div>
                                <h4 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-indigo-200 to-purple-600 font-bold">Guiter Guite</h4>
                                <span className="block text-sm text-gray-500">Chief Technical Officer</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-center hover:opacity-70">
                            <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64"
                                src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80" alt="woman" loading="lazy" width="1000" height="667" />
                            <div>
                                <h4 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-indigo-200 to-purple-600 font-bold">Tuyio Ghung</h4>
                                <span className="block text-sm text-gray-500">Chief Operations Officer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}

export default Team;