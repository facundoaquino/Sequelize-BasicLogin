module.exports= (sequelize,dataTypes)=>{

    const User = sequelize.define('user',{
        name:{

            type:dataTypes.STRING,
             
        },
        id:{
            type:dataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true
        },
        lastname:{
            type:dataTypes.STRING
        },
       password:{
           type:dataTypes.STRING
       },
       email:{
        type:dataTypes.STRING
    },
       
    },{
        // tableName:'users',
        timestamps:false
         
    })

    return User
}