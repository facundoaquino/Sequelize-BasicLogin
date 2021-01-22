module.exports= (sequelize,dataTypes)=>{

    const Post = sequelize.define('post',{
     
        id:{
            type:dataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true
        },
        post:{
            type:dataTypes.TEXT
        },
        user_id:{
            type:dataTypes.BIGINT,

        },
        created_at:{
            type:dataTypes.DATE
        }

       
       
    },{
        // tableName:'users',
        timestamps:false
         
    })

    return Post
}