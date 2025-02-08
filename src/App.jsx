import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'

function App() {

  const [password, setPassword] = useState("")
  const [length, setlength] = useState(6)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) chars += "0123456789"
    if(charAllowed) chars += "!@#$%^&*()_+="

    for (let i = 0; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length)
      pass = pass + chars[randomIndex]
    }

    setPassword(pass)

  }, [length, charAllowed, numberAllowed ])

  const copyPassToClipboard = useCallback(() => {

    passwordRef.current?.select();
    navigator.clipboard.writeText(password)

  }, [password])


  useEffect(() => {

    passwordGenerator()

  }, [length, charAllowed, numberAllowed ])
  

  return (
    <div className='flex flex-col justify-center items-center bg-[rgba(0,0,0,0.8)] w-full h-screen'>

      <h1 className='text-4xl font-bold text-white m-5'>Random Password Generator</h1>

      <div className='border-8 border-black rounded-2xl flex flex-col gap-6 w-1/2 bg-white h-[40%] justify-center'>

        <div className='flex gap-3 h-[16%] ml-[10%]'>
          <input className="border-2 border-black w-[70%] rounded-lg pl-2 font-bold" type="text" placeholder='password' value={password} ref={passwordRef} readOnly/>
          <button className="bg-black rounded-lg w-[18%] text-white font-semibold" onClick={copyPassToClipboard}>Copy</button>
        </div>

        <div className='flex gap-5 ml-[10%] w-[90%]'>
          <div className='w-[30%]'>
            <input className="w-[80%] accent-black" type="range" min={1} max={30} value={length} onChange={(e) => {setlength(e.target.value)}}/>
            <label className='font-bold text-lg'>{length}</label>
          </div>

          <div className='flex items-center'>
            <input className='w-4 h-4' type="checkbox" onChange={() => setNumberAllowed(prev => !prev)}/>
            <label className='font-bold text-lg ml-1'>Numbers</label>
          </div>

          <div className='flex items-center'>
            <input className='w-4 h-4' type="checkbox" onChange={() => setCharAllowed(prev => !prev)}/>
            <label className='font-bold text-lg ml-1'>Special Characters</label>
          </div>

        </div>


      </div>
    </div >

   
    
  )
}

export default App
