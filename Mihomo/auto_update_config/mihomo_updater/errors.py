class UpdaterError(RuntimeError):
    """Base error for updater failures."""


class MarkerError(UpdaterError):
    """Raised when a generated block marker is invalid."""


class RemoteDataError(UpdaterError):
    """Raised when remote data cannot be fetched or validated."""
