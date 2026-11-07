# Fashion
 
A fashion-showcasing social media app. Users compose magazine-style covers for their posts in a drag-and-drop WYSIWYG editor (text, images and shapes), publish them, and browse everyone's covers in a full-screen feed.
 
Built with [Next.js](https://nextjs.org) (App Router), [React](https://react.dev), [Supabase](https://supabase.com) and [Tailwind CSS](https://tailwindcss.com).
 
## Features
 
- **Cover editor** at `/post`: add text, images, squares, circles and triangles to a 400×650 page, then drag, resize and layer them (z-index) freely.
- **Text styling**: pick any Google Font and set the font size.
- **Public feed** at `/`: every post rendered full-screen from its stored layout.
- **Authentication** with Supabase email and password (`/login`), with sessions refreshed by the proxy.
