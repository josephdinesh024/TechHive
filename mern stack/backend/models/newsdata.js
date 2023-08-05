const mongooose = require('mongoose');

const schema = mongooose.Schema;
const newsmodels = new schema(
    {
        title:String,
        description :String,
        username :{
            type : String,
            require : true,
            
        },
        publish : {
            type : Boolean,
            default : false
        }
    },
    { timestamps : true}

);

module.exports = mongooose.model("news_Table",newsmodels);
