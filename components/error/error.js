function preAttributeCheckerErrorHandle (error) {

};

function attributeCheckerErrorHandle (error) {

};

function rulesErrorHandle (property, type) {
    if (!type) {
        if (property === "id" || property === "type") {
            throw {
                reason: `${property} must have value associated with it.`,
                property: `${property}`
            }
        }
        if (property.includes("%")) {
            throw {
                reason: `${property} must have value associated with it.`,
                property: `${property.substring}`
            }
        }
        throw {
            reason: `${property} must have value associated with it.`,
            property: `${property}`
        }
    }
};

function fiwareOrionErrorHandle (error) {
    throw { code: error.statusCode, msg: {
        error: error.name,
        info: error.error.description
    }}
}

module.exports = {
    preAttributeCheckerErrorHandle,
    attributeCheckerErrorHandle,
    fiwareOrionErrorHandle,
    rulesErrorHandle
}