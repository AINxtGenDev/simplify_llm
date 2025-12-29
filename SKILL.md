# SKILL.md - Project Documentation

## Project Goal

This project provides a comprehensive, visual, and interactive explanation of the fundamental concepts behind Large Language Models (LLMs), specifically the **Softmax Function** and the revolutionary **"Attention is All You Need"** paper.

**Note:** All website content is displayed in German for the target audience.

---

## Table of Contents

1. [The Softmax Function](#the-softmax-function)
2. [Attention is All You Need](#attention-is-all-you-need)
3. [The Transformer Architecture](#the-transformer-architecture)
4. [Mathematical Foundations](#mathematical-foundations)
5. [Practical Applications](#practical-applications)
6. [Technical Implementation](#technical-implementation)

---

## The Softmax Function

### What is Softmax?

The **Softmax function** is a mathematical function that converts a vector of arbitrary real numbers into a probability distribution. It is the heart of modern neural networks and plays a central role in the attention mechanism.

### Mathematical Definition

The Softmax function is defined as:

```
softmax(x_i) = exp(x_i) / Σ exp(x_j)
```

For an input vector **x** = [x₁, x₂, ..., xₙ] Softmax computes:

```
softmax(x)_i = e^(x_i) / (e^(x_1) + e^(x_2) + ... + e^(x_n))
```

### Properties of the Softmax Function

| Property | Description |
|----------|-------------|
| **Range** | All output values are between 0 and 1 |
| **Sum** | The sum of all output values is always exactly 1 |
| **Monotonicity** | Larger input values lead to larger probabilities |
| **Differentiability** | The function is differentiable everywhere (important for backpropagation) |

### Illustrative Example

Given the input vector: **x** = [2.0, 1.0, 0.1]

**Step 1:** Calculate exponential values
```
e^2.0 = 7.389
e^1.0 = 2.718
e^0.1 = 1.105
```

**Step 2:** Sum up
```
Sum = 7.389 + 2.718 + 1.105 = 11.212
```

**Step 3:** Calculate probabilities
```
P(x₁) = 7.389 / 11.212 = 0.659 (65.9%)
P(x₂) = 2.718 / 11.212 = 0.242 (24.2%)
P(x₃) = 1.105 / 11.212 = 0.099 (9.9%)
```

**Result:** [0.659, 0.242, 0.099] → Sum = 1.0 ✓

### Temperature Parameter

The **temperature** τ (tau) affects the "sharpness" of the probability distribution:

```
softmax(x_i, τ) = exp(x_i / τ) / Σ exp(x_j / τ)
```

| Temperature | Effect |
|-------------|--------|
| **τ < 1** | Sharper distribution, highest value dominates more |
| **τ = 1** | Standard Softmax |
| **τ > 1** | More uniform distribution, more exploration |

---

## Attention is All You Need

### The Revolutionary Paper

**"Attention is All You Need"** was published in 2017 by Vaswani et al. at Google and revolutionized natural language processing (NLP). The paper introduced the **Transformer architecture**, which today forms the foundation for all modern LLMs like GPT, BERT, Claude, and LLaMA.

### The Core Idea

Before Transformers, NLP models primarily used:
- **RNNs** (Recurrent Neural Networks)
- **LSTMs** (Long Short-Term Memory)
- **GRUs** (Gated Recurrent Units)

**Problem:** These architectures process sequences sequentially, which:
- Is slow (no parallelization)
- Has difficulties with long-range dependencies
- Causes high memory requirements for long sequences

**Solution:** The Transformer uses exclusively **attention mechanisms** and completely dispenses with recurrence.

### Self-Attention

The **Self-Attention mechanism** allows each token in a sequence to interact with all other tokens and gather relevant information.

#### The Three Vectors: Query, Key, Value

For each input token, three vectors are computed:

| Vector | Symbol | Function |
|--------|--------|----------|
| **Query (Q)** | Query | "What am I looking for?" |
| **Key (K)** | Key | "What do I offer?" |
| **Value (V)** | Value | "What information do I carry?" |

#### Attention Calculation

```
Attention(Q, K, V) = softmax(QK^T / √d_k) × V
```

**Step by Step:**

1. **Dot-Product:** Calculate QK^T (Query × Key-Transpose)
2. **Scaling:** Divide by √d_k (dimension of keys) for stabilization
3. **Softmax:** Convert scores to probabilities
4. **Weighted Sum:** Multiply with Values

### Multi-Head Attention

Instead of a single attention calculation, the Transformer uses **multiple parallel "heads"**:

```
MultiHead(Q, K, V) = Concat(head_1, head_2, ..., head_h) × W^O
```

**Advantages:**
- Different heads learn different types of relationships
- One head might learn syntactic relationships
- Another might learn semantic similarities
- Yet another might learn positional information

**Standard Configuration:**
- **GPT-3:** 96 heads
- **BERT-base:** 12 heads
- **Original Transformer:** 8 heads

---

## The Transformer Architecture

### Encoder-Decoder Structure

The original Transformer consists of:

```
┌─────────────────────────────────────────────────────────┐
│                    ENCODER                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Multi-Head Self-Attention                      │    │
│  └─────────────────────────────────────────────────┘    │
│                        ↓                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Feed-Forward Neural Network                    │    │
│  └─────────────────────────────────────────────────┘    │
│                    × N Layers                            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    DECODER                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Masked Multi-Head Self-Attention               │    │
│  └─────────────────────────────────────────────────┘    │
│                        ↓                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Multi-Head Cross-Attention (Encoder-Decoder)   │    │
│  └─────────────────────────────────────────────────┘    │
│                        ↓                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Feed-Forward Neural Network                    │    │
│  └─────────────────────────────────────────────────┘    │
│                    × N Layers                            │
└─────────────────────────────────────────────────────────┘
```

### Positional Encoding

Since Transformers have no inherent positional information (unlike RNNs), **positional encodings** are added:

```
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

**Properties:**
- Unique encoding for each position
- Enables learning of relative positions
- Generalizes to longer sequences than seen in training

### Layer Normalization and Residual Connections

Each sublayer is wrapped with:

```
output = LayerNorm(x + Sublayer(x))
```

**Residual Connections:** Enable gradient flow through deep networks
**Layer Normalization:** Stabilizes training

---

## Mathematical Foundations

### Scaled Dot-Product Attention

```python
def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: Queries  [batch, heads, seq_len, d_k]
    K: Keys     [batch, heads, seq_len, d_k]
    V: Values   [batch, heads, seq_len, d_v]
    """
    d_k = K.shape[-1]

    # Step 1: Dot-Product
    scores = Q @ K.transpose(-2, -1)  # [batch, heads, seq_len, seq_len]

    # Step 2: Scaling
    scores = scores / sqrt(d_k)

    # Step 3: Optional masking (for decoder)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Step 4: Softmax
    attention_weights = softmax(scores, dim=-1)

    # Step 5: Weighted sum
    output = attention_weights @ V

    return output, attention_weights
```

### Why Scale by √d_k?

With large dimensions, dot products become very large, leading to:
- Extremely small softmax gradients
- A "saturation" effect
- Unstable training

Scaling keeps the variance of scores constant.

### Feed-Forward Network

```
FFN(x) = max(0, xW₁ + b₁)W₂ + b₂
```

Or with GELU activation (modern variant):

```
FFN(x) = GELU(xW₁ + b₁)W₂ + b₂
```

**Dimensions:**
- Input: d_model (e.g., 512)
- Hidden: d_ff (e.g., 2048, typically 4× d_model)
- Output: d_model

---

## Practical Applications

### Where is Softmax + Attention Used?

| Application | Model | Description |
|-------------|-------|-------------|
| **Text Generation** | GPT-4, Claude | Predicting the next token |
| **Translation** | Google Translate | Encoder-Decoder Transformer |
| **Summarization** | BART, T5 | Compressing text |
| **Question Answering** | BERT, RoBERTa | Finding relevant passages |
| **Code Generation** | Codex, GitHub Copilot | Completing code |
| **Image Processing** | ViT, DALL-E | Vision Transformers |
| **Language + Image** | CLIP, Flamingo | Multimodal models |

### Example: Next Word Prediction

**Input:** "The sky is"

**Model Output (Logits):**
```
blue:     3.2
gray:     1.8
cloudy:   1.5
clear:    1.2
red:      0.8
...
```

**After Softmax:**
```
blue:     47.3%
gray:     11.6%
cloudy:    8.6%
clear:     6.4%
red:       4.3%
other:    21.8%
```

The model selects "blue" with the highest probability.

---

## Technical Implementation

### Project Structure

```
simplify_llm/
├── src/
│   ├── components/
│   │   ├── SoftmaxVisualizer.tsx      # Interactive Softmax visualization
│   │   ├── AttentionHeatmap.tsx       # Attention weights as heatmap
│   │   └── Layout.tsx                 # Navigation and layout
│   ├── pages/
│   │   ├── Home.tsx                   # Home page
│   │   ├── Softmax.tsx                # Softmax explanation
│   │   ├── Attention.tsx              # Attention mechanism
│   │   └── Transformer.tsx            # Overall architecture
│   ├── hooks/
│   │   └── useAnimation.ts            # Animation hook
│   ├── utils/
│   │   └── math.ts                    # Mathematical functions
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions deployment
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── SKILL.md
```

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI Framework |
| **TypeScript** | 5.x | Type Safety |
| **Vite** | 5.x | Build Tool |
| **Tailwind CSS** | 3.x | Styling |
| **Framer Motion** | 10.x | Animations |
| **React Router** | 6.x | Navigation |

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v4
```

---

## Learning Objectives

After studying this material, you should be able to:

1. **Understand Softmax:** The mathematical function and its role in neural networks
2. **Explain Attention:** How Query, Key, and Value work together
3. **Know the Transformer Architecture:** Encoder, Decoder, Multi-Head Attention
4. **Name Practical Applications:** Where these concepts are used in practice
5. **Implement Code:** Basic attention calculation yourself

---

## Further Resources

### Original Papers
- [Attention is All You Need](https://arxiv.org/abs/1706.03762) - Vaswani et al., 2017
- [BERT](https://arxiv.org/abs/1810.04805) - Devlin et al., 2018
- [GPT-2](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) - Radford et al., 2019

### Tutorials and Visualizations
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar
- [Attention? Attention!](https://lilianweng.github.io/posts/2018-06-24-attention/) - Lilian Weng
- [The Annotated Transformer](https://nlp.seas.harvard.edu/2018/04/03/attention.html) - Harvard NLP

### Books
- "Deep Learning" - Goodfellow, Bengio, Courville
- "Natural Language Processing with Transformers" - Tunstall, von Werra, Wolf

---

## License

MIT License - Free to use for educational purposes.

---

*Created with the goal of making complex AI concepts understandable.*
