import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-gray-700">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-lg font-semibold text-gray-500 md:text-xl">Error 404: Page lost in love. We'll keep searching until it comes back to us

			</p>
			<Link to="/dashboard"><button className='mt-10 px-8 py-3 text-white font-semibold rounded bg-light-blue-400'>Go to Dashboard</button></Link>
		</div>
	</div>
</section>
    </>
  )
}

export default NotFound