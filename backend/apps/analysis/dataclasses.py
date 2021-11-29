from dataclasses import dataclass
from datetime import datetime

@dataclass
class CommitAnalysisData:
    hash: str
    date: datetime
    message: str