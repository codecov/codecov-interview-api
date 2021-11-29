from dataclasses import dataclass
from datetime import datetime

@dataclass
class CommitAnalysisData:
    repository: str
    hash: str
    date: datetime
    message: str