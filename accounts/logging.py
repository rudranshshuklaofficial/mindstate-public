import logging
import re


class SensitiveRouteFilter(logging.Filter):
    def filter(self, record):
        message = record.getMessage()
        record.msg = re.sub(r'(/accounts/(?:invite|application)/)[^\s/?]+', r'\1[redacted]', message)
        record.args = ()
        return True
