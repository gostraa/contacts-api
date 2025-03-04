exports.receiveLogs = (req, res) => {
  const logData = req.body;
  console.log("Received log:", logData);
  res.status(200).send({ message: "Log received successfully" });
};