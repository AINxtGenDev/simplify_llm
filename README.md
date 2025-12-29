# Simplify LLM

Interactive explanation of Large Language Models - focusing on Softmax, Attention mechanisms, Transformers, and Tensors.

## Live Demo

**View the deployed website:**

👉 **[https://ainxtgendev.github.io/simplify_llm/](https://ainxtgendev.github.io/simplify_llm/)**

## Features

- **Softmax Function** - Interactive visualization with temperature control
- **Self-Attention** - Attention heatmap showing Query, Key, Value relationships
- **Transformer Architecture** - Encoder-Decoder structure explanation
- **Tensors & Hardware** - Scalar → Vector → Matrix → Tensor progression with GPU/TPU comparison

All content is displayed in **German** for the target audience.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Navigation |

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The project automatically deploys to GitHub Pages via GitHub Actions on every push to `main`.

### Manual Deployment Setup

1. Go to your repository **Settings** → **Pages**
2. Under "Build and deployment", select **Source: GitHub Actions**
3. Push to `main` branch - the workflow will automatically build and deploy

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Navigation & footer
│   ├── SoftmaxVisualizer.tsx   # Interactive softmax demo
│   └── AttentionHeatmap.tsx    # Attention weights visualization
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── Softmax.tsx             # Softmax explanation
│   ├── Attention.tsx           # Self-attention mechanism
│   ├── Transformer.tsx         # Transformer architecture
│   └── Tensor.tsx              # Tensors, GPU & TPU
├── utils/
│   └── math.ts                 # Mathematical functions
└── hooks/
    └── useAnimation.ts         # Animation utilities
```

## Documentation

See [SKILL.md](./SKILL.md) for comprehensive technical documentation about:
- Softmax function mathematics
- Attention mechanism (Query, Key, Value)
- Transformer architecture
- Practical applications

## License

MIT License - Free to use for educational purposes.

---

*Created to make complex AI concepts understandable through interactive visualizations.*
