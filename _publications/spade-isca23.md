---
title: "SPADE: A Flexible and Scalable Accelerator for SpMM and SDDMM"
authors: "Gerasimos Gerogiannis, Serif Yesil, <strong>Damitha Lenadora</strong>, Dingyuan Cao, Charith Mendis, Josep Torrellas"
venue: "International Symposium on Computer Architecture (ISCA)"
year: 2023
description: "An accelerator for SpMM and SDDMM"
links:
  - name: PDF
    url: https://dl.acm.org/doi/pdf/10.1145/3579371.3589054
---

## Abstract

The widespread use of Sparse Matrix Dense Matrix Multiplication (SpMM) and Sampled Dense Matrix Dense Matrix Multiplication (SDDMM) kernels makes them candidates for hardware acceleration. However, accelerator design for these kernels faces two main challenges: (1) the overhead of moving data between CPU and accelerator (often including an address space conversion from the CPU’s virtual addresses) and (2) marginal flexibility to leverage the fact that different sparse input matrices benefit from different variations of the SpMM and SDDMM algorithms. 
To address these challenges, this paper proposes SPADE, a new SpMM and SDDMM hardware accelerator. SPADE avoids data transfers by tightly-coupling accelerator processing elements (PEs) with the cores of a multicore, as if the accelerator PEs were advanced functional units—allowing the accelerator to reuse the CPU memory system and its virtual addresses. SPADE attains flexibility and programmability by supporting a tile-based ISA—high level enough to eliminate the overhead of fetching and decoding fine-grained instructions. To prove the SPADE concept, we have taped-out a simplified SPADE chip. Further, simulations of a SPADE system with 224–1792 PEs show its high performance and scalability. A 224-PE SPADE system is on average 2.3x, 1.3x and 2.5x faster than a 56-core CPU, a server-class GPU, and an SpMM accelerator, respectively, without accounting for the host-accelerator data transfer overhead. If such overhead is taken into account, the 224-PE SPADE system is on average 43.4x and 52.4x faster than the GPU and the accelerator, respectively. Further, SPADE has a small area and power footprint.

## Citation

```bibtex
@inproceedings{10.1145/3579371.3589054,
author = {Gerogiannis, Gerasimos and Yesil, Serif and Lenadora, Damitha and Cao, Dingyuan and Mendis, Charith and Torrellas, Josep},
title = {SPADE: A Flexible and Scalable Accelerator for SpMM and SDDMM},
year = {2023},
isbn = {9798400700958},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3579371.3589054},
doi = {10.1145/3579371.3589054},
abstract = {The widespread use of Sparse Matrix Dense Matrix Multiplication (SpMM) and Sampled Dense Matrix Dense Matrix Multiplication (SDDMM) kernels makes them candidates for hardware acceleration. However, accelerator design for these kernels faces two main challenges: (1) the overhead of moving data between CPU and accelerator (often including an address space conversion from the CPU's virtual addresses) and (2) marginal flexibility to leverage the fact that different sparse input matrices benefit from different variations of the SpMM and SDDMM algorithms.To address these challenges, this paper proposes SPADE, a new SpMM and SDDMM hardware accelerator. SPADE avoids data transfers by tightly-coupling accelerator processing elements (PEs) with the cores of a multicore, as if the accelerator PEs were advanced functional units---allowing the accelerator to reuse the CPU memory system and its virtual addresses. SPADE attains flexibility and programmability by supporting a tile-based ISA---high level enough to eliminate the overhead of fetching and decoding fine-grained instructions. To prove the SPADE concept, we have taped-out a simplified SPADE chip. Further, simulations of a SPADE system with 224--1792 PEs show its high performance and scalability. A 224-PE SPADE system is on average 2.3x, 1.3x and 2.5x faster than a 56-core CPU, a server-class GPU, and an SpMM accelerator, respectively, without accounting for the host-accelerator data transfer overhead. If such overhead is taken into account, the 224-PE SPADE system is on average 43.4x and 52.4x faster than the GPU and the accelerator, respectively. Further, SPADE has a small area and power footprint.},
booktitle = {Proceedings of the 50th Annual International Symposium on Computer Architecture},
articleno = {19},
numpages = {15},
keywords = {hardware accelerator, sparse computations, SpMM, SDDMM},
location = {Orlando, FL, USA},
series = {ISCA '23}
}
```
