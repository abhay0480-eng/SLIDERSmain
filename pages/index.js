import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import "nouislider/distribute/nouislider.css";
import React, {useState,useEffect} from 'react'
import FormData from 'form-data';
import axios from 'axios';
import OptionSlider from '../components/OptionSlider'



const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

const carat_from = 0.30, carat_to = 30.00, price_from = 100, price_to = 900000

    //generate carat range for slider
    var caratRangeArr = [];
    for (var e = '', t = [[0.18, 0.02], [1, 0.05], [2, 0.1], [2.5, 0.25], [4, 0.5], [10, 5], [20, 10], [carat_to]], i = carat_from, a = 0; a < t.length - 1; i += t[a][1]) {
        caratRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }

    var carat_array = [];
    const caratOptions = []
    var carat_step = 100 / (caratRangeArr.length - 1);
    caratRangeArr.map((element,index) =>{
        caratOptions.push(<option key={index} value={parseFloat(element)}>{element} ct</option>)
        if(index == 0){
            carat_array["min"] = parseFloat(carat_from);
        }else if(index == caratRangeArr.length - 1){
            carat_array["max"] = parseFloat(carat_to);
        }else{
            carat_array[(carat_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })

    //convert array to object			
    const caratArr = JSON.parse(JSON.stringify(Object.assign({}, carat_array)));

var priceRangeArr = [];
    for (var e = '', t = [[100, 100], [2500, 500], [1e4, 1e3], [2e4, 2e3], [4e4, 5e3], [1e5, 1e4], [2e5, 5e4], [4e5, 1e5], [(price_to)]], i = (price_from)  , a = 0; a < t.length - 1; i += t[a][1]){
        priceRangeArr.push(i.toFixed(2)), i >= t[a + 1][0] && a++;
    }                  	
    priceRangeArr[priceRangeArr.length - 1] = price_to.toFixed(2);

    var price_array = [];
    const priceOptions = []
    var price_step = 100 / (priceRangeArr.length - 1);
    priceRangeArr.map((element,index) =>{
        priceOptions.push(<option key={index} value={parseFloat(element)}>£{numberWithCommas(parseInt(element))}</option>)
        if(index == 0){
            price_array["min"] = parseFloat(price_from);
        }else if(index == priceRangeArr.length - 1){
            price_array["max"] = parseFloat(price_to);
        }else{
            price_array[(price_step * index).toFixed(2)+'%'] = parseFloat(element);
        }
    })

    //convert array to object			
const priceArr = JSON.parse(JSON.stringify(Object.assign({}, price_array)));  


export default function Home({ ndata }) {
  const initialRender = React.useRef(true);
  
  let d = {
    filter_price_min: ndata.price_total_from_in_currency,
    filter_price_max: ndata.price_total_to_in_currency,
    filter_carat_min: ndata.size_from,
    filter_carat_max: ndata.size_to,
    filter_cut_min: 0,
    filter_cut_max: 4,
    filter_color_min: 0,
    filter_color_max: 10,
    filter_clarity_min: 0,
    filter_clarity_max: 9,
    filter_fluorescence_min: 0,
    filter_fluorescence_max: 4,
    filter_symmerty_min: 0,
    filter_symmerty_max: 5,
    filter_polish_min: 0,
    filter_polish_max: 5,
    filter_table_min: 0,
    filter_table_max: 88,
    filter_depth_min: 0,
    filter_depth_max: 106.60,
    lab: [],
    origin: 'ALL',
    shape: [],
    search_ID : '',
    page_offset: 1,
    sorting_order: 'ASC',
    sort_by: 'fame_price'
  }



let [flag, setflag] = useState(false)
  function show(){

      setflag(pre => !pre)

  }


  let [Data, setData] = useState(d)
  useEffect(() => {  
  if (typeof window !== "undefined") {
    setData(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : d)
    
  }
  }, []);

  


  let formData = new FormData();    //formdata object
 
  for (var key in Data) {

      if(Array.isArray(Data[key])){
        Data[key].map((ty) => {
          formData.append(key+'[]',ty)
        })
      }else{
        formData.append(key,Data[key])
      }
    // }
}
   //append the values with key, value pair

const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}

axios.post('http://gems.netfillip.org/public/getdiamonds', formData, config)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        // console.log(error);
    });
  

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      localStorage.setItem('items', JSON.stringify(Data))
     
    }
    },[Data]);

  function flip(item, arr) {
    
    setData(prevData => (prevData[arr].includes(item)?{
      ...prevData,
     [arr]: [...prevData[arr].slice(0, prevData[arr].indexOf(item)),...prevData[arr].slice( prevData[arr].indexOf(item)+1)]

    }:{ ...prevData,
      [arr]: [...prevData[arr], item]
    })) 
  }



  function handleChange(l, r, event) {

     setData((prevData) => ({
      ...prevData,
      [l]: event[0],
      [r]: event[1]
     }))
    
  }

  function origin(p){
    setData(prevData => ({
      ...prevData,
      origin: p
      
    }))
  }


  function handle(p, event) {
    const { value } = event.target
    setData(prevData => ({
      ...prevData,
      [p]: (value)
    }))

  }


  let shape = ['round','princess','cushion','asscher','marquise','oval','radiant','pear','emerald','heart']
  let  s = shape.map(item => {
   return(
   <div className={`w-[40px] inline-block text-center cursor-pointer ${Data.shape.includes(item)?"border-black border ":" none"}`}>
      <Image
          src = {`/images/shapes/${item}.png`}
          width={30}
          height={30}
         alt="Picture of the author"
         onClick={() => flip(item,"shape")}
        />
     </div>
     
   ) 
 })


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>   
     <Image
      src='/images/Flawless-Logo.png'
      alt="Picture of the author"
      width={300}
      height={100}
    />
   </div>

   <div className='mx-auto flex w-[60%] justify-between  z-50'>
     <div className='w-[47%]'>
       <div className='flex items-center mt-[30px]'>
         <div>SHAPE</div>
         <div className='ml-[10px] flex w-[100%] justify-between'>{s}</div>
           
       </div>
       <OptionSlider 
       name="CARAT" 
       range={caratArr} 
       data={Data} 
       click={handleChange} 
       options={caratOptions}
       left="filter_carat_min"
       right="filter_carat_max"
       handleclick={handle}
       flag="op"
       />

<OptionSlider 
       name="COLOR" 
       range={{ min: 0 , max: 10 }}
       data={Data} 
       click={handleChange} 
      
       left="filter_color_min"
       right="filter_color_max"
       handleclick={handle}
       flag="color"
       kut="color"
       />
       
     </div>
     <div className='w-[47%]'>
     <OptionSlider 
     name="PRICE" 
     range={priceArr} 
     data={Data} 
     click={handleChange} 
     options={priceOptions} 
     handleclick={handle}
     left="filter_price_min"
     right="filter_price_max"
     flag="op"
     
     />

<OptionSlider 
     name="CUT" 
     range={{ min: 0 , max: 4 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_cut_min"
     right="filter_cut_max"
     flag="cut"
     kut="cut"
     
     />

<OptionSlider 
     name="CLARITY" 
     range={{ min: 0 , max: 9 }}
     data={Data} 
     click={handleChange} 
   
     handleclick={handle}
     left="filter_clarity_min"
     right="filter_clarity_max"
     flag="clarity"
     kut="color"
     
     />
      
     </div>
   </div>

   <div className= {` ${flag? "max-h-[500px] flex justify-between max-w-[60%] mx-auto modal overflow-hidden"  : "overflow-hidden max-h-[0px] flex justify-between max-w-[60%] mx-auto modal "}  `} >
     <div className={`w-[47%]`}> 

     <OptionSlider 
     name="FLUOR" 
     range={{ min: 0 , max: 4 }}
     data={Data} 
     click={handleChange} 
   
     handleclick={handle}
     left="filter_fluorescence_min"
     right="filter_fluorescence_max"
     flag="fluor"
     kut="cut"
     
     />

<OptionSlider 
     name="SYMM" 
     range={{ min: 0 , max: 5 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_symmerty_min"
     right="filter_symmerty_max"
     flag="symm"
     kut="symm"
     
     />

<OptionSlider 
     name="TABLE" 
     range={{min:0,max:88}}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_table_min"
     right="filter_table_max"
     flag="depth"
     />
          
          <div className='flex justify-between mt-[30px]'>
       <div>LOCATE</div>
       <div className='w-[100%] ml-[20px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "ALL" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("ALL")}>ALL</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.origin == "UK" ?"bg-black text-white":"bg-white text-black"}`} onClick={() => origin("UK")}>UK</span>
              
              
       </div>
     </div>
       
     </div>
     <div className='w-[47%]'>

     <div className='flex justify-between mt-[30px]'>
       <div>REPORT</div>
       <div className='w-[100%] ml-[25px]'>
      
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("GIA")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("GIA","lab")}>GIA</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("IGI")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("IGI","lab")}>IGI</span>
              <span className={`w-[70px] py-[5px] border border-black inline-block text-center mr-[4px] cursor-pointer ${Data.lab.includes("AGS")?"bg-black text-white":"bg-white text-black"}`} onClick={() => flip("AGS","lab")}>AGS</span>
              
       </div>
     </div>

     <OptionSlider 
     name="POLISH" 
     range={{ min: 0 , max: 5 }}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_polish_min"
     right="filter_polish_max"
     flag="polish"
     kut="symm"
     
     />

<OptionSlider 
     name="DEPTH" 
     range={{min:0,max:106.60}}
     data={Data} 
     click={handleChange} 
     handleclick={handle}
     left="filter_depth_min"
     right="filter_depth_max"
     flag="depth"
     />
      
    </div>
    </div>
   
   <div><button className={`mx-auto block mt-[50px]`}  onClick={show} >advance filter</button></div>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://gems.netfillip.org/public/getfilter`)
  const ndata = await res.json()

  return { props: { ndata } }
}



