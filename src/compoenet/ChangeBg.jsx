import React, { useState } from 'react'

function ChangeBg() {
    const [color, setColor] = useState("red")
  return (
    <div>
       <div className=' text-4xl h-screen' style={{backgroundColor: color}} >
      <div className='flex flex-wrap fixed  pt-[900px] p-3 '>

        <div className='p-4 bg-white'>

        <button  onClick={()=> setColor("red") } className='p-5 mx-2 outline-none rounded-xl bg-red-500 text-white'>red</button>

        <button onClick={()=> setColor("green") } className='p-5  mx-2 outline-none rounded-xl bg-green-500 text-white'>green</button>

        <button  onClick={()=> setColor("pink") } className='p-5  mx-2 outline-none rounded-xl bg-pink-500 text-white'>pink</button>

        <button onClick={()=> setColor("orange") } className='p-5 mx-2  outline-none rounded-xl bg-orange-500 text-white'>olive</button>
        
        </div>
      </div>
      </div>

    </div>
  )
}

export default ChangeBg
