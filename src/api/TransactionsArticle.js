import { SendPostRequestToService } from './comunication-handler'


var TransactionsArticle = {
    SaveArticle: { transactionName: "ArticleSave", transactionCode: "TxQQRArticleSave", parameters: {}, },
    GetAllArticle: { transactionName: 'GetAllArticles', transactionCode: 'TxQQRGetAllArticles', parameters: {} },
    DeleteArticle: { transactionName: 'DeleteArticle', transactionCode: 'TxQQRDeleteArticle', parameters: {} }
}

export function SaveArticle(data, addFunction) {
    var transaction = TransactionsArticle.SaveArticle;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxArticle');
}

export function GetAllArticles(addFunction) {
    var transaction = TransactionsArticle.GetAllArticle;
    transaction.parameters = {};
    SendPostRequestToService(transaction, addFunction, 'TxArticle');
}

export function DeleteArticle(data, addFunction) {
    var transaction = TransactionsArticle.DeleteArticle;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxArticle');
}
