var express = require("express");
var router = express.Router();

/* GET users listing. */

function validateAndConvertToIntegerArray(input) {
  input = input.trim();

  if (input === "") {
    return "Input tidak boleh kosong.";
  }

  // Regex untuk memvalidasi hanya angka yang dipisahkan dengan koma
  if (!/^\d+(,\d+)*$/.test(input)) {
    return "Input tidak valid. Hanya angka yang dipisahkan dengan koma yang diizinkan.";
  }

  // Mengubah string menjadi array dan konversi menjadi array integer
  const stringArray = input.split(",");
  const integerArray = stringArray.map(Number);

  return integerArray;
}

function isset(variable) {
  if (typeof variable !== "undefined" || variable !== null || variable != "") {
    return true;
  } else {
    return false;
  }
}

router.get("/", function (req, res, next) {
  var result = null;
  var datasum = null;

  const submit_T = req.query.submit_T;

  if (isset(submit_T)) {
    console.log("yanto");
  }

  if (isset(req.query.submit_T)) {
    var datainput = req.query.datainput;
    var data_array = validateAndConvertToIntegerArray(datainput);

    if (typeof data_array === "string") {
      result = data_array;
    } else {
      data_array.sort();
      const n = data_array.lenght;

      for (let i = 0; i < n; i++) {
        datasum += data_array[i];
      }
      result = datasum / n;
    }
  }

  res.render("statistika/mean", {
    title: "Mean",
    datainput: datainput,
    datasort: datainput,
  });
});

module.exports = router;
