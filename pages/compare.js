
    
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link'

export default function compare(){

    let nam = {

        Round: 'ROUND',
        B:'ROUND',
        BR:'ROUND',
        RD:'ROUND',
        RB:'ROUND',
        RBC:'ROUND',
        ["Round Brilliant"]:'ROUND',
        RND:'ROUND',
        ROUND:'ROUND',
        Princess:'PRINCESS',
        PRN:'PRINCESS',
        PRIN:'PRINCESS',
        PR:'PRINCESS',
        PN:'PRINCESS',
        PC:'PRINCESS',
        PRINCESS:'PRINCESS',
        CUSHION:'CUSHION',
        "Cushion Brilliant":'CUSHION',
        Cushion:'CUSHION BRILLIANT',
        CB:'CUSHION BRILLIANT',
        "Cushion Modified":'CUSHION',
        C:'CUSHION',
        CU:'CUSHION',
        CMB:'CUSHION',
        CUSH:'CUSHION',
        CRC:'CUSHION',
        SCMB:'CUSHION',
        "CUSHION MODIFIED":'CUSHION',
        'CUSHION BRILLIANT':'CUSHION',
        ASSCHER:'ASSCHER',
        A:'ASSCHER',
        CSS:'ASSCHER',
        CSSC:'ASSCHER',
        AC:'ASSCHER',
        Asscher:'ASSCHER',
        MARQUISE:'MARQUISE',
        Marquise:'MARQUISE',
        MQB:'MARQUISE',
        M:'MARQUISE',
        MQ:'MARQUISE',
        OVAL:'OVAL',
        Oval:'OVAL',
        O:'OVAL',
        OV:'OVAL',
        OMB:'OVAL',
        RADIANT:'RADIANT',
        Radiant:'RADIANT',
        R:'RADIANT',
        RAD:'RADIANT',
        RA:'RADIANT',
        RC:'RADIANT',
        RDNv:'RADIANT',
        "Square Radiant":'RADIANT',
        "Sq Radiant":'RADIANT',
        SQR:'RADIANT',
        'SQUARE RADIANT':'RADIANT',
        PEAR:'PEAR',
        P:'PEAR',
        PS:'PEAR',
        PSH:'PEAR',
        PB:'PEAR',
        PMB:'PEAR',
        EMERALD:'EMERALD',
        Emerald:'EMERALD',
        E:'EMERALD',
        EM:'EMERALD',
        EC:'EMERALD',
        'Square Emerald':'EMERALD',
        SQE:'EMERALD',
        SQEM:'EMERALD',
        SX:'EMERALD',
        'SQUARE EMERALD':'EMERALD',
        HEART:'HEART',
        Heart:'HEART',
        H:'HEART',
        HS:'HEART',
        HT:'HEART',
        MHRC:'HEART',
        GIA:'GIA',
        G:'GIA',
        'G.I.A':'GIA',
        IGI:'IGI',
        I:'IGI',
        AGS:'AGS',
        AGSL:'AGS',
        AGS0:'AGS',
        A:'AGS',
        HRD:'HRD',
        H:'HRD',
        Excellent:'Excellent',
        EX:'Excellent',
        EXC:'Excellent',
        'Very Good':'Very Good',
        VG:'Very Good',
        Good:'Good',
        G:'Good',
        GD:'Good',
        F:'Fair',
        Fair:'Fair',
        Poor:'Poor',
        P:'Poor',
        Strong:'Strong',
        S:'Strong',
        STG:'Strong',
        ST:'Strong',
        FL3:'Strong',
        Medium:'Medium',
        M:'Medium',
        MED:'Medium',
        FL2:'Medium',
        Faint:'Faint',
        F:'Faint',
        FNT:'Faint',
        FA:'Faint',
        FL1:'Faint',
        None:'None',
        N:'None',
        NON:'None',
        No:'None',
        NIL:'None',
        FL0:'None',
        nil:'None',
          }


          let [compareItems,setcompareItems] = useState([])
  
          let [heartCount,setheartCount] = useState(0)
          useEffect(() => {  
            if (typeof window !== "undefined") {
              setcompareItems(localStorage.getItem('compare') && JSON.parse(localStorage.getItem('compare'))  )
     
                setheartCount(localStorage.getItem('heartcount') && JSON.parse(localStorage.getItem('heartcount'))  )
            }  
            }, []);

       
          

    // function remove(p){
    //     const index = compareItems.indexOf(p);
    //     compareItems.splice(index, 1)
       
    //     setheartCount(prev=>prev-1)
    //   }

      useEffect(() => {
   
        localStorage.setItem('compare', JSON.stringify(compareItems))
    
        localStorage.setItem('heartcount', JSON.stringify(heartCount))
     
        },[heartCount]);


 

        let a = []   

        let [res,setRes] = useState([])
useEffect(()=>{
   axios.get(` http://gems.netfillip.org/public/comparediamondsdata?ids=${compareItems}`)
    .then(res1 => {
      const diamondss = res1.data;
      setRes(diamondss)
    
    })
   
},[heartCount])

res.map(item=>a.push(item.stock_num))



function swapRight(p){

  const node = document.getElementById("parent");
  const list = document.getElementById(a[a.indexOf(p)+1]);
  document.getElementById(a[a.indexOf(p)]).classList.add("animation2");
  document.getElementById(a[a.indexOf(p)+1]).classList.add("animation1");
  setTimeout(function() {
    document.getElementById(a[a.indexOf(p)]).classList.remove("animation2");
    document.getElementById(a[a.indexOf(p)+1]).classList.remove("animation1");
    node.insertBefore(list, node.children[a.indexOf(p)]);
    var temp = a[a.indexOf(p)]
    var temp1 = a.indexOf(p) + 1
    a.splice(a.indexOf(p),1,a[a.indexOf(p) + 1]);
    a.splice(temp1,1,temp);
   
  }, 1000); 
}


function swapLeft(p){
 
  
  const node = document.getElementById("parent");
  const list = document.getElementById(a[a.indexOf(p)]);
 
  document.getElementById(a[a.indexOf(p)]).classList.add("animation1");
  document.getElementById(a[a.indexOf(p)-1]).classList.add("animation2");
  setTimeout(function() {
    document.getElementById(a[a.indexOf(p)]).classList.remove("animation1");
  document.getElementById(a[a.indexOf(p)-1]).classList.remove("animation2");
  node.insertBefore(list, node.children[a.indexOf(p)-1]);
 
  var temp = a[a.indexOf(p)]
  var temp1 = a.indexOf(p) - 1
  a.splice(a.indexOf(p),1,a[a.indexOf(p) - 1]);
  a.splice(temp1,1,temp);

 
}, 1000);

  
}
let [boxName,setboxName] = useState()
let [hide,sethide]=useState(false)

function infobox(b){
sethide(prev=>!prev)
setboxName(b)
}

if (typeof window !== "undefined") {
  window.addEventListener('click', function(e) {
    const allModals = document.querySelectorAll('.box');
    if (!e.path.some(x => x.className && (x.className.includes('box') && box  || x.className.includes('fa-circle-info') ))) {
      allModals.forEach(x => {x.style.display = 'none' 
     });
    }
  }, true)
}


   console.log('pop')
   console.log(res)

  
    return(

        <div>
            <Head>
//         <title>Compare</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
//       </Head>

<div className="container  max-w-[1130px] mx-auto ">
<Link href="/diamonds">
<div className='cursor-pointer mb-[50px]' >back to diamonds</div>
        </Link>
      
      <h1 className='text-[2em] text-center mb-[40px]'>Compare Diamond({res.length})</h1>
      <div className='border border-[black]  w-[100%]  flex'>
      <div className="w-[15%] relative">
      <div className="grid grid-rows-15 col-span-1 text-right  ">
      <div className='border border-[black] h-[40px]'></div>
      <div className='border border-[black] h-[150px] p-[10px] '>Image</div>
      <div className='border border-[black] h-[40px] p-[10px]'>View Details</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Price</div>
      <div className='border border-[black] h-[40px]'></div>
    
      <div className='border border-[black] h-[40px] p-[10px] relative'>Shape <i onClick={()=>infobox('shape')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='shape'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>shape</div>}</div>
      
    
      
      <div className='border border-[black] h-[40px] p-[10px] relative'>Carat Weight <i onClick={()=>infobox('carat')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='carat'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>carat</div>}
</div>
      
      <div className='border border-[black] h-[40px] p-[10px] relative'>Color <i onClick={()=>infobox('Color')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Color'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Color</div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Clarity <i onClick={()=>infobox('Clarity')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Clarity'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Clarity</div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Cut <i onClick={()=>infobox('Cut')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Cut'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Cut</div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Polish <i onClick={()=>infobox('Polish')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Polish'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Polish</div>}</div>


      <div className='border border-[black] h-[40px] p-[10px]'>Symmetry</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Fluorescence</div>
      <div className='border border-[black] h-[40px] p-[10px]'>Measurements</div>
      <div className='border border-[black] h-[40px] p-[10px] relative'>Depth % <i onClick={()=>infobox('Depth')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Depth'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Depth</div>}</div>


      <div className='border border-[black] h-[40px] p-[10px] relative'>Table % <i onClick={()=>infobox('Table')} class="fa-solid fa-circle-info"></i>{hide&& boxName==='Table'&&<div className='w-[300px] absolute left-[169px] top-[-100px] z-40 bg-[white] h-[300px] border border-[black] box'>Table</div>}</div>


    </div>
    </div>
   
  <div className=' overflow-x-scroll w-[85%] flex  aa' id='parent'>
  {res.map((item) =>  <div key={item.stock_num} className='  bb' id={item.stock_num}>
        <div  className='border border-[black] h-[40px] cursor-pointer flex items-center justify-center pp '><i onClick={()=>swapLeft(item.stock_num)} className="fa-solid fa-arrow-left-long mr-[30px]"></i><p onClick={()=>{ const index = compareItems.indexOf(item.stock_num);
        compareItems.splice(index, 1)
        setheartCount(prev=>prev-1)}}>remove</p><i onClick={()=>swapRight(item.stock_num)} className="fa-solid fa-arrow-right-long ml-[30px]"></i></div>
      <div className='border border-[black] h-[150px] overflow-hidden bg-center'>{ item.image_url?<Image src={`/api/imagefetcher?url=${encodeURIComponent(
              item.image_url
            )}`} alt="hh"  className=' object-cover' width="100%" height="100%" layout="responsive" />:<Image src={`https://flawlessfinejewelry.com/wp-content/plugins/ring-builder/images/diamond_new_icons/new/${(nam[item.shape]).toLowerCase()}.jpg`} alt="hh" className=' object-cover' width="100%" height="100%" layout="responsive" />}</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{item.stock_num}</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>£ {parseInt(item.fame_price) }</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'><button className='px-[45px] py-[3px] bg-[#333333] rounded text-white'>ADD TO</button></div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{nam[item.shape]} </div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{item.carat } </div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{item.color } </div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{item.clarity}</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{nam[item.cut] }</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{nam[item.polish] }</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{nam[item.symmetry] }</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{nam[item.fluorescence] }</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{ item.width}</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{item.depth_percent}</div>
      <div className='border border-[black] h-[40px] flex items-center justify-center'>{ item.table_percent}</div>
    </div>)}
  </div>
    

        
      
      </div>
    </div>
        </div>

    )
}

    // Fetch data from external API

  

 
  