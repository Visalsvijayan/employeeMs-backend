const errorHandler=(err,req,res,next)=>{
    console.log('error:',err.message)
    res.status(err.status || 500).json({
        success:false,
        message:err.message || 'Internal server error'
})
}

export default errorHandler