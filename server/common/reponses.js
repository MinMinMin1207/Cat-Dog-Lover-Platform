export function Response(code, message, data, paging) {
  if (paging == undefined) {
    return { code, message, data };
  }
  return { code, message, data, paging };
}

export function MessageResponse(message) {
  return Response(200, message);
}

export function DataResponse(data, paging) {
  return Response(200, "OK", data, paging);
}

export function NotFoundResponse() {
  return ErrorResponse(404, "Not Found");
}

export function MissingFieldResponse() {
  return ErrorResponse(400, "Missing field");
}

export function InvalidTypeResponse() {
  return ErrorResponse(400, "Input type is invalid");
}

export function InternalErrorResponse() {
  return Response(500, "Internal server error");
}

export function ErrorResponse(errorCode, errorMessage) {
  return Response(errorCode, errorMessage);
}

export function UnAuthorizedResponse() {
  return ErrorResponse(401, "Unauthorized");
}
