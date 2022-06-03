



function Cuts(prop){
    let clr = ["left-[41.5px]","left-[83px]","left-[124.5px]","left-[166px]","left-[207.5px]","left-[249px]","left-[290.5px]","left-[332px]","left-[373.5px]"]
    let cut=["left-[103px]","left-[206px]","left-[312px]"]
    let symmm = ["left-[83px]","left-[166px]","left-[249px]","left-[332px]"]
   
    let colour = clr.map(t=>{
      return  <span className={`absolute top-[-10px] ${t} z-50 text-[#ffffff] w-[12px]`}>|</span>
    })
    let cut1 = cut.map(t=>{
        return  <span className={`absolute top-[-10px] ${t} z-50 text-[#ffffff] w-[12px]`}>|</span>
      })
      let symm = symmm.map(t=>{
        return  <span className={`absolute top-[-10px] ${t} z-50 text-[#ffffff] w-[12px]`}>|</span>
      })
    return  <>{prop.p==='color'? colour:prop.p==='cut'?cut1:prop.p==='symm'?symm :null}</>
     
           
}

export default Cuts

