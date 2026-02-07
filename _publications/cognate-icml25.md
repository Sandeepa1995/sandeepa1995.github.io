---
title: "COGNATE: Acceleration of Sparse Tensor Programs on Emerging Hardware using Transfer Learning"
authors: "Chamika Sudusinghe, Gerasimos Gerogiannis, <strong>Damitha Lenadora</strong>, Charles Block, Josep Torrellas, Charith Mendis"
venue: "ICML"
year: 2025
description: "Transfer learning to train cost models for sparse accelerators."
links:
  - name: PDF
    url: https://arxiv.org/pdf/2506.00424
---

## Abstract

Sparse tensor programs are essential in deep learning and graph analytics, driving the need for optimized processing. To meet this demand, specialized hardware accelerators are being developed. Optimizing these programs for accelerators is challenging for two reasons: program performance is highly sensitive to variations in sparse inputs, and early-stage accelerators rely on expensive simulators. Therefore, ML-based cost models used for optimizing such programs on general-purpose hardware are often ineffective for early-stage accelerators, as they require large datasets for proper training. To this end, we introduce COGNATE, a novel framework that leverages inexpensive data samples from general-purpose hardware (e.g., CPUs) to train cost models, followed by few-shot fine-tuning on emerging hardware. COGNATE exploits the homogeneity of input features across hardware platforms while effectively mitigating heterogeneity, enabling cost model training with just 5% of the data samples needed by accelerator-specific models to achieve comparable performance. We conduct extensive experiments to demonstrate that COGNATE outperforms existing techniques, achieving average speedups of 1.47x (up to 5.46x) for SpMM and 1.39x (up to 4.22x) for SDDMM.

## Citation

```bibtex
@inproceedings{sudusinghecognate,
  title={COGNATE: Acceleration of Sparse Tensor Programs on Emerging Hardware using Transfer Learning},
  author={Sudusinghe, Chamika and Gerogiannis, Gerasimos and Lenadora, Damitha and Block, Charles and Torrellas, Josep and Mendis, Charith},
  booktitle={Forty-second International Conference on Machine Learning}
}
```
