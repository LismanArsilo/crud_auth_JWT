const findAllCount = async (req, res) => {
  try {
    const majors = await req.context.models.majors.findAndCountAll({
      limit: 1,
    });
    if (!majors) return res.status(404).json({ message: "Get Data Not Found" });
    return res.status(200).json({ data: majors, message: "Get Data Success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default {
  findAllCount,
};
