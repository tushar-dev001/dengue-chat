import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPage = () => {

    const handleSubmit = ()=>{
        
    }

  return (
    <div className='flex justify-center mt-40'>
        <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6 w-96"
                action="#"
              >
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    // required=""
                  />
                </div>


                <button
                  type="submit"
                  className="w-full text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Send Email
                </button>
              </form>
    </div>
  )
}

export default ForgotPage