class HandlerMessage{
  handlerError(response, error){
    response.status(500).json({
      error: error.code,
      error_message: error.sqlMessage,
    })
  }
  handlerSuccess(response, data){
    response.status(200).json({
      success: "Response success !",
      data,
    })
  }
}

module.exports = new HandlerMessage();
