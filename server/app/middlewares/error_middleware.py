from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import logging
import traceback

logger = logging.getLogger("error_middleware")

# Global error handler middleware
async def error_handler(request: Request, call_next):
    try:
        return await call_next(request)
    except HTTPException as exc:
        logger.warning(
            f"HTTPException: {exc.status_code} - {exc.detail} "
            f"at {request.method} {request.url}"
        )
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "detail": exc.detail,
                "method": request.method,
                "url": str(request.url),
            },
        )
    except Exception as exc:
        logger.error(
            f"Unhandled Exception: {exc} at {request.method} {request.url}\n"
            f"Traceback: {traceback.format_exc()}"
        )
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal Server Error",
                "method": request.method,
                "url": str(request.url),
            },
        )
