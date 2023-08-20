'use client'

import React from 'react'

function LogoutButton() {
  return (
    <button 
    onClick={() => console.log("sss")
    }
    className=" bg-blue-400 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Sign Out
    </button>
  )
}

export default LogoutButton