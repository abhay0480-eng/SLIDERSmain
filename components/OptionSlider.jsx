
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Cuts from './Cuts'
import Label from './Label'



function OptionSlider(props){
   

    return(
        <div className='flex justify-between mt-[30px]'>
        <div>{props.name}</div>
        <div className='w-[100%] ml-[35px]'>
        <div className='relative'>
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
      </div>
    )
}

export default OptionSlider

