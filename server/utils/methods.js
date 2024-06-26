exports.getAll = Model => async function(req, res) {

  const data = await Model.find();

  if(!data) {
      res.send(JSON.stringify('[An error has occured]'));
  }

  res.status(200).json({
      status: "success",
      length: data.length,
      data
  });

};

exports.getOne = Model => async function(req , res) {

  try {
    const id = req.params.id;
    const data = await Model.findById(id);

    return res.status(200).json({
        status: "success",
        data
    });
  } catch(err) {
    return res.status(500).json({
        status: "failure",
        message: err
    });    
  }

}

exports.deleteOne = Model => async function (req, res) {

  try {
    const id = req.params.id;
    await Model.findByIdAndDelete(id);

    return res.status(200).json({
        status: "success",
        message: "Project deleted successfully"
    })
  } catch(err) {
    return res.status(500).json({
        status: "failure",
        message: err
    });
  }
  
}