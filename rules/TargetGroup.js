"use strict";

const rules = require("../components/rules");

const TargetGroup = {
    "id": rules.singleValueCheck,
    "type": rules.singleValueCheck,
    "name": rules.textValueCheck,
    "acronym": rules.textValueCheck,
    "description": rules.textValueCheck
  };
  
  module.exports = TargetGroup;