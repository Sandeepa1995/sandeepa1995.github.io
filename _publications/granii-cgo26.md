---
title: "GRANII : Selection and Ordering of Primitives in GRAph Neural Networks using Input Inspection"
authors: "<strong>Damitha Lenadora</strong>, Vimarsh Sathia, Gerasimos Gerogiannis, Serif Yesil, Josep Torrellas, Charith Mendis"
venue: "Code Generation and Optimization (CGO)"
year: 2026
description: "A technique to select and order optimizations in GNNs"
links:
  - name: PDF
    url: https://charithmendis.com/assets/pdf/26-cgo-granii.pdf
---

## Abstract

Over the years, many frameworks and optimization techniques have been proposed to accelerate graph neural networks (GNNs). In contrast to the optimizations explored in these systems, we observe that different matrix re-associations of GNN computations lead to novel input-sensitive performance behavior. We leverage this observation to propose GRANII, a system that exposes different compositions of sparse and dense matrix primitives based on different matrix re-associations of GNN computations and selects the best among them based on input attributes. GRANII executes in two stages: (1) an offline compilation stage that enumerates all valid re-associations leading to different sparse-dense matrix compositions and uses inputoblivious pruning techniques to prune away clearly unprofitable candidates, and (2) an online runtime system that explores the remaining candidates and uses lightweight cost models to select the best re-association based on the input graph and the embedding sizes. On a wide range of configurations, GRANII achieves a geo-mean speedup of 1.56× for inference and 1.4× for training across multiple GNN models and systems. We also show GRANII’s technique functions on diverse implementations and with techniques such as sampling.

## Citation (TODO)

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
