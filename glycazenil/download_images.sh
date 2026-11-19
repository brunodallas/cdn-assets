#!/bin/bash
# ============================================================
# Script para baixar as imagens do glycazenil e subir no GitHub
# Rode na pasta cdn-assets: bash glycazenil/download_images.sh
# ============================================================

cd "$(dirname "$0")"

echo "📥 Baixando imagens do HEAD..."
curl -sS -L -o blob-3.png "https://allhealthyhabits.online/glycazenil-welcome-page/assets/blob-3.png" && echo "  ✓ blob-3.png" || echo "  ✗ blob-3.png"
curl -sS -L -o blob-5.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/blob-5.jpg" && echo "  ✓ blob-5.jpg" || echo "  ✗ blob-5.jpg"
curl -sS -L -o blob-4.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/blob-4.jpg" && echo "  ✓ blob-4.jpg" || echo "  ✗ blob-4.jpg"
curl -sS -L -o blob-2.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/blob-2.jpg" && echo "  ✓ blob-2.jpg" || echo "  ✗ blob-2.jpg"
curl -sS -L -o blob-1.webp "https://allhealthyhabits.online/glycazenil-welcome-page/assets/blob-1.webp" && echo "  ✓ blob-1.webp" || echo "  ✗ blob-1.webp"

echo ""
echo "📥 Baixando imagens do FOOT (comentários)..."
curl -sS -L -o comentarios/7eaf79fa240856a67cf01446802ab60ef31dfc9a72234914f29d4f484a7a07a5.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/7eaf79fa240856a67cf01446802ab60ef31dfc9a72234914f29d4f484a7a07a5.jpg" && echo "  ✓ lisa-g.jpg" || echo "  ✗ lisa-g.jpg"
curl -sS -L -o comentarios/309213926ecf8d3333679e8509bb90f24eca4ee820d23288d5a22d14cca5b7b3.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/309213926ecf8d3333679e8509bb90f24eca4ee820d23288d5a22d14cca5b7b3.jpg" && echo "  ✓ david-collins.jpg" || echo "  ✗ david-collins.jpg"
curl -sS -L -o comentarios/8f34f9d4e111c9c28375fdd803c26cdd029fc4cde91df4cf5e5245d64d140eb0.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/8f34f9d4e111c9c28375fdd803c26cdd029fc4cde91df4cf5e5245d64d140eb0.jpg" && echo "  ✓ emily-lewis.jpg" || echo "  ✗ emily-lewis.jpg"
curl -sS -L -o comentarios/515acc8df0208b560908789f1f864639bdcf6da3e47453e3045902359b4373c1.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/515acc8df0208b560908789f1f864639bdcf6da3e47453e3045902359b4373c1.jpg" && echo "  ✓ charlotte-williams.jpg" || echo "  ✗ charlotte-williams.jpg"
curl -sS -L -o comentarios/9a6515c5c242ee410772f9bd13050ed2187fc7ae9b25a41a65efcb3f5617163e.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/9a6515c5c242ee410772f9bd13050ed2187fc7ae9b25a41a65efcb3f5617163e.jpg" && echo "  ✓ jason-c.jpg" || echo "  ✗ jason-c.jpg"
curl -sS -L -o comentarios/1efa39586dab8ba93923a8153178e060ecbeb4cd005a6e5f5f7e7f7249f066a4.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/1efa39586dab8ba93923a8153178e060ecbeb4cd005a6e5f5f7e7f7249f066a4.jpg" && echo "  ✓ matthew-r.jpg" || echo "  ✗ matthew-r.jpg"
curl -sS -L -o comentarios/e746565946b6445286b91fcb19a21ecf46368c446e89907ad733046bb3edb804.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/e746565946b6445286b91fcb19a21ecf46368c446e89907ad733046bb3edb804.jpg" && echo "  ✓ victoria-carter.jpg" || echo "  ✗ victoria-carter.jpg"
curl -sS -L -o comentarios/17083e3e2354d33cafffbbedf45c7602d8c5e805289ba444e17d222b7c75294c.jpg "https://allhealthyhabits.online/glycazenil-welcome-page/assets/comentarios/17083e3e2354d33cafffbbedf45c7602d8c5e805289ba444e17d222b7c75294c.jpg" && echo "  ✓ madison-scott.jpg" || echo "  ✗ madison-scott.jpg"

echo ""
echo "📥 Baixando ícones de reação..."
curl -sS -L -o like.png "https://allhealthyhabits.online/glycazenil-welcome-page/assets/like.png" && echo "  ✓ like.png" || echo "  ✗ like.png"
curl -sS -L -o heart.png "https://allhealthyhabits.online/glycazenil-welcome-page/assets/heart.png" && echo "  ✓ heart.png" || echo "  ✗ heart.png"

echo ""
echo "✅ Download completo! Agora rode:"
echo "  cd $(dirname $(pwd))"
echo "  git add glycazenil/"
echo "  git commit -m 'add glycazenil head/foot assets'"
echo "  git push"
