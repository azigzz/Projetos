# Sávio | Projetos

Portfólio simples em React, Vite, TypeScript, Tailwind CSS e Framer Motion.

## Vídeo da intro

O vídeo original fica em `public/videos/book-transition.mp4`. Para a intro controlada por scroll, ele foi convertido em uma sequência de frames em `public/book-frames/` e renderizado em `canvas`. Isso evita controlar `video.currentTime` no scroll, que costuma causar engasgos e pulos de frame no navegador.

Para regenerar os frames:

```bash
ffmpeg -y -i public/videos/book-transition.mp4 -vf "fps=24,scale=1280:-2" -q:v 3 public/book-frames/frame_%04d.jpg
```
