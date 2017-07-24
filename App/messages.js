module.exports = ({
  success: {
    ok: 200,
    created: 201,
    accepted: 202,
    noContent: 204
  },
  warning: {
    badRequest: [400, "The server cannot process the request"],
    notFound: [404, "The requested resource could not be found"],
    methodNotAllow: [405, "The request method is not supported for the requested resource"],
    header: [417, "The server cannot meet the requirements of the Expect request-header field."]
  },
  user: {
    userExist: [409, "this username is already taken"],
    userEmpty: [404, "User DB is empty"],
    userNotFound: [404, "User not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  pizza: {
    pizzaExist: [409, "this pizza name is already taken"],
    pizzaEmpty: [404, "pizza DB is empty"],
    pizzaNotFound: [404, "pizza not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  order: {
    orderExist: [409, "this order name is already taken"],
    orderEmpty: [404, "order DB is empty"],
    orderNotFound: [404, "order not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  ingredient: {
    ingredientExist: [409, "this ingredient name is already taken"],
    ingredientEmpty: [404, "ingredient DB is empty"],
    ingredientNotFound: [404, "ingredient not found in the db"],
    Unauthorized: [401, "The request requires admin permission."]
  },
  token: {
    invalidToken: [498, "expired or invalid token."],
    tokenRequired: [499, "token is required but was not submitted."],
    authentication: [511, "Network Authentication Required"]
  },
  database: {
    create: [500, "Database cound't add this object to the db"],
    update: [500, "Database cound't update this object on the db"],
    delete: [500, "Database cound't delete this object on the db"]
  }
})