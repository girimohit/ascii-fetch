# ASCII-FETCH

> **Fastfetch / Neofetch-style GitHub README card generator with real-time ASCII art rendering.**

Create a developer-focused, terminal-style bio card for your GitHub profile README in seconds. Upload any photo, convert it into an ASCII matrix, customize your tech stack, and download a PNG ready to drop into your profile.


## Features

- **Real-Time ASCII Art Engine**: 100% client-side image-to-ASCII conversion with luminance grayscale mapping and `0.52` monospace aspect ratio correction.
- **Dual Art Controls**:
  - **Density Slider**: Adjust character sampling resolution (30 to 180 columns).
  - **Art Scale Slider**: Scale the display font size independently without breaking card alignment.
  - **Invert Ramp**: Flip between light and dark ASCII character ramps.
- **Dynamic Field Editor**:
  - Customize GitHub username.
  - Add, edit, or delete custom key-value pairs (Role, Languages, Tools, Architecture, etc.).
  - Add custom section dividers (`- Contact ───`).
- **Card Background Customizer**: Choose between presets (*GitHub Dark `#0d1117`*, *Pitch Black `#05070a`*, *Charcoal `#161b22`*) or select any custom hex color.
- **1-Click High-Res PNG Export**: Exports crisp 2x pixel-density PNG cards optimized for GitHub READMEs with no scrollbars.
- **Modern Glassmorphic UI**: Obsidian dark theme (`#181818`) with `#C660CE` purple accents and subtle ambient mesh.


## Tech Stack

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Exporting**: [html-to-image](https://github.com/bubkoo/html-to-image)


## Author

Crafted by **[Mohit Giri](https://github.com/girimohit)**.


## License

This project is licensed under the MIT License.
