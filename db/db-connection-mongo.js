const mongoose = require ('mongoose');

const getConnection = async () => {

        try {
            const url= 'mongodb://yuliana:tAHFvQa4HpJaPnAp@ac-jcqk0wu-shard-00-00.xx9bhdx.mongodb.net:27017,ac-jcqk0wu-shard-00-01.xx9bhdx.mongodb.net:27017,ac-jcqk0wu-shard-00-02.xx9bhdx.mongodb.net:27017/inventarios-iud?ssl=true&replicaSet=atlas-m17l8b-shard-0&authSource=admin&retryWrites=true&w=majority'
            await mongoose.connect(url);

            console.log ('conexion exitosa');
        } catch (error) {
            console.log(error);
        }

        
}
module.exports= {
    getConnection,
}
