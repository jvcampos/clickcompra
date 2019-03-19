class HandlerMessage{
  handlerError(response, error){
    response.status(500).json({
      error: error.code,
      error_message: error.sqlMessage,
    })
  }
  handlerSuccess(response, data){
    response.status(200).json({
      success: "Response success!",
      data,
    })
  }
  handlerUpdate(response, data){
    response.status(200).json({
      success: "Updated success!",
      data,
    })
  }
  handlerDelete(response, data){
    response.status(200).json({
      success: "Deleted success!",
      data,
    })
  }
  handlerNotFound(response){
    response.status(404).json({
      error: "Ops, what are you looking, was not found !"
    })
  }
}

module.exports = new HandlerMessage();
