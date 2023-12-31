import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [lenght, setLenght] = useState(8)
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charactorAllowed, setCharactorAllowed] = useState(false)
  // password ganarator functions
  const passwordGanerator = useCallback(() => { 
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz";
    if (numberAllowed) str += "0123456789";
    if (charactorAllowed) str += "!@#$%^&*()~`.,";
    for (let i = 1; i <= lenght; i++) {
      const randomNumber = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomNumber)
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charactorAllowed, setPassword])
  // copy password
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,41)
    window.navigator.clipboard.writeText(password)
  }, [password])
  const passwordRef = useRef(null)
  useEffect(() => {
    passwordGanerator()
  }, [lenght, numberAllowed, charactorAllowed, setPassword])

  return (
    <>
      <div className="main-container flex justify-center">
        <div className="box rounded-sm bg-slate-900 p-3 rounded mt-5 text-amber-500">
          <p className='text-center'>Password Ganerotor</p>
          <div className="input-copy-container">
            <input
              type="text"
              readOnly
              value={password}
              className="border p-2 w-80 rounded"
              ref={passwordRef}
            />
            <button onClick={copyPassword} className='bg-blue-600 p-2 text-white rounded'>Copy</button>
          </div>
          <div className="extra-conatiner">
            <input
              type="range"
              max={40}
              min={6}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => { setLenght(e.target.value) }}
            />
            <label>lenght ({lenght})</label>
            <input type="checkbox" className="rounded" onChange={() => setNumberAllowed(!numberAllowed)} /> <label>
              Numbers
            </label>
            <input type="checkbox" className="rounded" onChange={() => setCharactorAllowed(!charactorAllowed)} /> <label>charactors</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
