import React from 'react';

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      {/* Main container */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-[650px] bg-white rounded-3xl shadow-lg overflow-hidden">
        
        {/* Left side */}
        <div className="lg:w-7/12 w-full bg-blue-600 flex justify-center items-center p-8">
          {/*<h2 className="text-4xl font-semibold text-white text-center">Welcome!</h2>*/}
        </div>

        {/* Right side */}
        <div className="lg:w-5/12 w-full flex flex-col justify-center items-center p-8 bg-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-10">
            Sign in to your account
          </h2>

          {/* Inputs container */}
          <div className="w-full max-w-sm space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="exemple@fac.com"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Login button */}
            <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
