const { executeQuery } = require("../services/queryService");

const getQueryResult = async (req, res) => {
  try {
    const annotationId = req.params.annotationId;
    if (!annotationId) {
      return res.status(400).json({ error: "annotationId is required" });
    }

    const query = `SELECT e.empl_nombres, e.empl_firma 
                    FROM javaphc.anotaciones a
                    INNER JOIN javap.usuarios u ON a.anot_registradopor = u.usua_id
                    LEFT  JOIN javap.empleados e ON u.usua_idpersona = e.empl_id
                    WHERE anot_id =${annotationId}`;
    const result = await executeQuery(query);

    if (result.length === 0 || !result[0].empl_firma) {
      return res.status(404).json({ error: "No results found" });
    }
    const imageBase64 = result[0].empl_firma;
    const imageBuffer = Buffer.from(
      imageBase64.replace("data:image/png;base64,", ""),
      "base64"
    );
    res.contentType("image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getQueryResult };
