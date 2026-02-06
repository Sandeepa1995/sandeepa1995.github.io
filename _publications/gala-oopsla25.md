---
title: "GALA: A High Performance Graph Neural Network Acceleration LAnguage and Compiler"
authors: "<strong>Damitha Lenadora</strong>, Nikhil Jayakumar, Chamika Sudusinghe, Charith Mendis"
venue: "Object-Oriented Programming, Systems, Languages & Applications (OOPSLA)"
year: 2025
description: "A GNN DSL and Compiler for combining optimizations of different granularities."
links:
  - name: PDF
    url: https://dl.acm.org/doi/pdf/10.1145/3763113
  - name: Code
    url: https://github.com/ADAPT-uiuc/GALA-GNN-Acceleration-LAnguage
---

## Abstract

Multiple frameworks and optimizations have been proposed for accelerating Graph Neural Network (GNN) workloads over the years, achieving sizable runtime performance improvements. However, we notice that existing systems usually explore optimizing either at the intra-operator level or at the inter-operator level, missing synergies that exist due to their compositions. Further, most existing works focus primarily on optimizing the forward computation of GNNs, often overlooking opportunities for training-specific optimizations.
To exploit these missed optimization opportunities, we introduce GALA, a domain-specific language (DSL) and a compiler that allows composing optimizations at different levels. The GALA DSL exposes intra-operator transformations as scheduling commands, while we introduce novel inter-operator transformations as part of the compiler. The composition of these transformations is made possible through the introduction of two novel intermediate representations (IR) in the GALA compiler that tracks and composes transformations at both the intra- and inter-operator levels. Further, the IRs maintain a global view of the GNN program, including its training process. This allows us to introduce training-specific transformations to aggressively optimize GNN training. Our evaluations show that GALA achieves a geo-mean speedup of 2.55× for inference and 2.52× for training across multiple systems, graphs, and GNN models. We also show that GALA performs well across different graph sizes and GNN model configurations, as well as allows users to explore different methods of performing similar optimizations leading to different tradeoff spaces.

## Citation

```bibtex
@article{lenadora:gala:oopsla25,
author = {Lenadora, Damitha and Jayakumar, Nikhil and Sudusinghe, Chamika and Mendis, Charith},
title = {GALA: A High Performance Graph Neural Network Acceleration LAnguage and Compiler},
year = {2025},
issue_date = {October 2025},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
volume = {9},
number = {OOPSLA2},
url = {https://doi.org/10.1145/3763113},
doi = {10.1145/3763113},
abstract = {Multiple frameworks and optimizations have been proposed for accelerating Graph Neural Network (GNN) workloads over the years, achieving sizable runtime performance improvements. However, we notice that existing systems usually explore optimizing either at the intra-operator level or at the inter-operator level, missing synergies that exist due to their compositions. Further, most existing works focus primarily on optimizing the forward computation of GNNs, often overlooking opportunities for training-specific optimizations.   To exploit these missed optimization opportunities, we introduce GALA, a domain-specific language (DSL) and a compiler that allows composing optimizations at different levels. The GALA DSL exposes intra-operator transformations as scheduling commands, while we introduce novel inter-operator transformations as part of the compiler. The composition of these transformations is made possible through the introduction of two novel intermediate representations (IR) in the GALA compiler that tracks and composes transformations at both the intra- and inter-operator levels. Further, the IRs maintain a global view of the GNN program, including its training process. This allows us to introduce training-specific transformations to aggressively optimize GNN training. Our evaluations show that GALA achieves a geo-mean speedup of 2.55\texttimes{} for inference and 2.52\texttimes{} for training across multiple systems, graphs, and GNN models. We also show that GALA performs well across different graph sizes and GNN model configurations, as well as allows users to explore different methods of performing similar optimizations leading to different tradeoff spaces.},
journal = {Proc. ACM Program. Lang.},
month = oct,
articleno = {335},
numpages = {29},
keywords = {Graph Neural Networks, Intermediate Representations}
}
```
