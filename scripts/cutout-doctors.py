"""One-off chroma-key for the join-banner team photo.

Pass local source/destination paths before reuse. Convert the PNG
output to WebP before committing it to public/image.
"""

from collections import deque
from pathlib import Path

from PIL import Image

src = Path(r"C:\Users\asus\.cursor\projects\c-Users-asus-Documents-TBD-Care\assets\doctors-chroma.png")
dst = Path(r"C:\Users\asus\Documents\TBD Care\public\image\doctors-image.png")

im = Image.open(src).convert("RGBA")
pixels = im.load()
w, h = im.size


def chroma_amount(r: int, g: int, b: int) -> float:
    return g - max(r, b)


def is_green(r: int, g: int, b: int, a: int) -> bool:
    if a < 8:
        return True
    return chroma_amount(r, g, b) > 38 and g > 90


visited = bytearray(w * h)
q: deque[tuple[int, int]] = deque()

for x in range(w):
    q.append((x, 0))
    q.append((x, h - 1))
for y in range(h):
    q.append((0, y))
    q.append((w - 1, y))

cleared = 0
while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= w or y >= h:
        continue
    idx = y * w + x
    if visited[idx]:
        continue
    visited[idx] = 1
    r, g, b, a = pixels[x, y]
    if not is_green(r, g, b, a):
        continue
    pixels[x, y] = (0, 0, 0, 0)
    cleared += 1
    q.extend(
        (
            (x + 1, y),
            (x - 1, y),
            (x, y + 1),
            (x, y - 1),
        )
    )

# Despill remaining green fringe on opaque pixels near transparent neighbors
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        amount = chroma_amount(r, g, b)
        if amount <= 12:
            continue
        near_empty = False
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and pixels[nx, ny][3] == 0:
                near_empty = True
                break
        if not near_empty:
            continue
        if amount > 55:
            pixels[x, y] = (r, g, b, 0)
            cleared += 1
        else:
            new_g = max(r, b)
            fade = max(0, min(255, int(a * (1 - amount / 90))))
            pixels[x, y] = (r, new_g, b, fade)

im.save(dst)
print(f"saved {dst} size={im.size} cleared={cleared}")
