import { useState } from 'react'


function App() {
  const [color, setcolor] = useState("");
  return (
    <>
      <div className="h-screen"
        style={{ backgroundColor: color }}>
        <div className="fixed flex justify-center bottom-12 inset-x-0 px-2 ">
          <div className="flex justify-center gap-8 shadow-lg bg-white rounded-xl px-4 py-1">
            
            <button
              onClick = {()=>setcolor("blue")}
              className="outline-none text-white shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "blue" }}>
              blue
            </button>

            <button
              onClick = {()=>setcolor("red")}
              className="outline-none text-white shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "red" }}>
              red
            </button>
            
            <button
              onClick = {()=>setcolor("green")}
              className="outline-none text-white shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "green" }}>
              green
            </button>
            
            <button
              onClick = {()=>setcolor("yellow")}
              className="outline-none text-black shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "yellow" }}>
              yellow
            </button>
            
            <button
              onClick = {()=>setcolor("black")}
              className="outline-none text-white shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "black" }}>
              black
            </button>
            
            <button
              onClick = {()=>setcolor("orange")}
              className="outline-none text-white shadow-lg px-4  py-1 rounded-full"
              style={{ backgroundColor: "orange" }}>
              orange
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
