
/* ===================== LIBRERIAS ================================== */
import { encryptAES, decryptAES } from '../utils/crypto3DESHandler';
import { FetchAjax } from './ajax-handler';


/* ================= URIs PARA ENVIO DE LA DATA ======================*/
var client = 'http://localhost:8440/client/api';
var article = 'http://localhost:8440/article/api';
var order = 'http://localhost:8440/order/api';


function decide(tx) {
    switch (tx) {
        case 'TxClient':
            return client;
        case 'TxArticle':
            return article;
        case 'TxOrder':
            return order;
    }
}

export function SendPostRequestToService(WebRequest, addFunction, typeTx, platForm) {

    if (WebRequest.parameters != null) {
        WebRequest.parameters = encryptAES(WebRequest.parameters);
    }
    var url = decide(typeTx);
    return FetchAjax(WebRequest, addFunction, url);

}

export function SuccessServiceCall(data, MovilRequest, addFunction) {

    try {
        var responseClaro = undefined;
        var messageObj = data.message;
        var status = data.status;
        if (data.parameters != null) {
            responseClaro = decryptAES(data.parameters, true);

        } else {
            responseClaro = { message: '', status: '' }
            responseClaro.message = data.message;
            responseClaro.status = data.status;
        }
        if (addFunction) {
            addFunction(responseClaro, status, messageObj);
        }

    } catch (error) {
        console.log(error);
    }
}


export function AnalizeServerResponse(result) {
    try {
        if (result.TransactionResponseCode != '00') {
            throw result;
        }
        return result.ResponseElements;
    } catch (e) {
        throw e;
    }
}
