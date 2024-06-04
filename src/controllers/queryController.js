const { executeQuery } = require("../services/queryService");

const getQueryResult = async (req, res) => {
  try {
    const annotationId = req.params.annotationId;
    if (!annotationId) {
      return res.status(400).json({ error: "annotationId is required" });
    }

    const query = `SELECT e.empl_nombres, e.empl_firma, e2.empl_firma as 'firma_aux'
                    FROM javaphc.anotaciones a
                    INNER JOIN javap.usuarios u ON a.anot_registradopor = u.usua_id
                    LEFT  JOIN javap.empleados e ON u.usua_idpersona = e.empl_id
                    left join javaphc.anotaciones_sello as2 on a.anot_id = as2.anot_id 
                    left JOIN javap.usuarios u2 ON as2.anot_registradopor  = u2.usua_id
                    LEFT  JOIN javap.empleados e2 ON u2.usua_idpersona = e2.empl_id
                    WHERE a.anot_id = ${annotationId}`;

    const result = await executeQuery(query);

    if (
      result.length === 0 ||
      (!result[0].empl_firma && !result[0].firma_aux)
    ) {
      res.contentType("image/jpeg");
      res.send(Buffer.from("", "base64"));
      return;
    }
    const imageBase64 = result[0]?.firma_aux ?? result[0].empl_firma;
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
