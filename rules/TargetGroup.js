"use strict";

const rules = require("../components/rules");

const TargetGroup = {
    "id": rules.singleValueCheck,
    "type": rules.singleValueCheck,
    "name": rules.textValueCheckMandatory,
    "acronym": rules.textValueCheckMandatory,
    "description": rules.textValueCheck
  };
  
  module.exports = TargetGroup;