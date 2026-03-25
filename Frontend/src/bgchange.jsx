// import { useState } from "react";

// export default function BG() {
//     const [color, setcolor] = useState("black");

//     return (
//         <>
//              <div className="h-screen"
//                 style={{ backgroundColor : color }}>
//                 <div className="fixed flex bottom-12 inset-x-0 px-2 justify-center">
//                     <div className="flex gap-8 ml-8 shadow-lg bg-white rounded-2xl px-4 py-1 ">
//                         <button className=" shadow-lg outline-none text-white rounded-3xl py-2 px-7 "
//                             onClick={() => setcolor("blue") }
//                             style={{backgroundColor : "blue"}}
//                         >blue</button>

//                         <button  className="shadow-lg outline-none text-white rounded-3xl py-2 px-7"
//                             onClick={() =>setcolor("red")}
//                             style={{backgroundColor : "red"}}>red</button>

//                         <button  className=" shadow-lg outline-none text-white rounded-3xl py-2 px-7"
//                             onClick={() => setcolor("green") }
//                             style={{backgroundColor : "green"}}>green</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }