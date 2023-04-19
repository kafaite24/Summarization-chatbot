import logging
import sys

logger = logging.getLogger()
logger.setLevel(logging.WARNING)
logger.addHandler(
    logging.StreamHandler(sys.stdout)
)