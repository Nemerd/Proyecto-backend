function generateMessage(params) {
    return `There was an error:
    ->  first_name received ${params.first_name}
    ->  last_name received ${params.last_name}
    ->  email received ${params.email}
    ->  password  received ${params.password}`
}

module.exports = { generateMessage }