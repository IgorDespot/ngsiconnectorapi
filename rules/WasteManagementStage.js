"use strict";

const rules = require("../components/rules");

const WasteManagementStage = {
    "id": rules.singleValueCheck,
    "type": rules.singleValueCheck,
    "name": rules.textValueCheckMandatory
  };
  
  module.exports = WasteManagementStage;