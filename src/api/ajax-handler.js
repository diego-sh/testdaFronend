 import {SuccessServiceCall, ServiceFailed, AnalizeServerResponse} from './comunication-handler';
 import {decryptAES} from '../utils/crypto3DESHandler';
 import $ from 'jquery';


export function FetchAjax(WebRequest, addFunction, Uri){
    fetch(Uri,
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(WebRequest)
    })
    .then( 
        (response)=>{
            return response.json();
        }).then((wri3)=>{
        //var resp= decryptAES(responseData, true);
        debugger;
        SuccessServiceCall(wri3,WebRequest,addFunction);
        //return (responseData.d);  						    			
    }).catch( err => console.error(err))  
}
