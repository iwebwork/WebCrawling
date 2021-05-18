const firebase = require('./firebase_connect_exemple');

module.exports = {
    saveTicket: function (req) {
        if(!req){
            return {"statuscode":404,"message":'The dice is empty'};
        }
        firebase.database().ref('acoes/'+req.papel).set(req, function (err){
            if(err) {
                return false;
            }else{
                return true;
            }

        });
    }
}
