const express = require('express');
const port = 8081;
const webCrawller = require('./webcrawller'); 

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(port, function(err, data) {
    if(err){
        console.log(err);
    }else{
        console.log('deu');
    }
});

app.post('/updateTicket', function(req, res) {
    const data = webCrawller.checkPapel(req.body.ticket);
    
    if(data) {
        res.send({"statuscode":500,"message":"Erro ao executar a requisição"}); 
    }else{
        res.send({"statuscode":200,"message":"Insert sucess"});
    }

});

module.exports = app;
