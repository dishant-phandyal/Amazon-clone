from typing import Generator

LayoutItem = ...

def warn_on_missing_glyph(codepoint: int) -> None: ...
def layout(string: str, font, *, kern_mode: int = ...) -> Generator: ...
