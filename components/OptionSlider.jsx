
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Cuts from './Cuts'
import Label from './Label'



function OptionSlider(props){
 

    return(
     
        <div className='md:flex md:justify-between md:mt-[30px] md:w-[100%]  '>
        <div className="md:w-[20%] px-[10px] py-[15px] md:px-[0px] md:py-[0px] border border-[black] rounded md:border-none" onClick={()=>props.filter(props.name)}>{props.name}</div>
        <div className={` fixed z-40 h-[300px] w-[390px] rounded  boxmobile md:shadow-none p-[20px] right-[2px] md:h-[auto] md:w-[100%] md:static ${props.filbox===props.name && props.ffbox?"bottom-0":" bottom-[-200px] hidden md:block"}   bg-[white]` }>
        <div className='md:hidden flex justify-between mb-[30px]'>
       <p onClick={()=>props.filter(props.name)}>Close</p>
       <p onClick={()=>props.resett()} >Reset</p>
     </div>
        <div className=' md:block md:w-[100%] w-[90%] m-auto'>
          <div className='md:relative  '>
                <Nouislider 
                  snap={props.flag==='op'?true:false}
                  range={props.range}
                  start={[props.data[props.left], props.data[props.right]]}
                  onChange = {(e) => props.click(`${props.left}`,`${props.right}`,e) }
                  step={1} 
                  margin={props.flag!=='op' ? 1: null}
                  connect 
          />
          
            <Cuts p={props.kut}/>
      
          </div>
          <Label k={props.flag} d={props.data} l={props.left} r={props.right} o={props.options} h={props.handleclick}/>
        </div>
        <div className='md:hidden flex justify-center mt-[80px]'>
<button className='bg-[black] text-[white] py-[10px] px-[20px]' onClick={()=>filterbox('SHAPE')}>VIEW {props.res} RESULTS</button>
</div>
        </div>
        
      </div>
    )
}

export default OptionSlider

