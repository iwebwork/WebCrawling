
const request = require('request');
const cheerio = require('cheerio');
const ofirebase = require('./firebase/setData');

module.exports = {
    checkPapel: function (papel) {
        let options = {
            url: 'https://fundamentus.com.br/detalhes.php?papel='+papel,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }
        }
        
        request(options, function(err, res,body){
            
            const ticket = {
                papel: papel,
                cotacao:'',
                empresa: '',
                dia:'',
                mes:'',
                dozeMeses:''
            };

            if(!err && res.statusCode == 200){                
                const $ = cheerio.load(body);
                                
                // cotação
                $('td.data.destaque.w3').each(function() {
                    ticket.cotacao = $(this).find('span.txt').text(); 
                });


                var array = []
                // Empresa
                $('div.conteudo.clearfix table.w728 tbody tr td.data').each(function(element) {
                    const valor = $(this).find('span.txt').text();
                    array.push(valor)
                });

                var arrayDois = [];
                array.map(function(element){
                    if(element.includes('\n'))
                        arrayDois.push(element.replace('\n',''))
                    else if (element.includes('-'))
                        arrayDois.push(element.replace('-',''))
                    else
                        arrayDois.push(element);

                })
                ticket.empresa = arrayDois[4];
                
                array = []
                arrayDois = []
                $('div.conteudo.clearfix table.w728 tbody tr td.data').each(function(element) {
                    const valor = $(this).find('span.oscil').text();
                    array.push(valor)
                });
                array.map(function(element){
                    if(element.includes('\n'))
                        arrayDois.push(element.replace('\n',''))
                    else if (element.includes('-'))
                        arrayDois.push(element.replace('-',''))
                    else if (element !== '')
                        arrayDois.push(element);

                })
                
                console.log(arrayDois);

                ticket.dia = arrayDois[0];
                ticket.mes = arrayDois[1];
                ticket.dozeMeses = arrayDois[3];

                let response = ofirebase.saveTicket(ticket);

                return response;
            }
            else{
                return false;
            }
        })          
    }
}