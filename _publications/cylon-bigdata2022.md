---
title: "Hybrid Cloud and HPC Approach to High-Performance Dataframes"
authors: "Kaiying Shan, Niranda Perera, <strong>Damitha Lenadora</strong>, Tianle Zhong, Arup Kumar Sarker, Supun Kamburugamuve, Thejaka Amila Kanewela, Chathura Widanage, Geoffrey Fox"
venue: "IEEE International Conference on Big Data (Big Data)"
year: 2022
description: "Cylon"
links:
  - name: Link
    url: https://ieeexplore.ieee.org/document/10020958
---

## Abstract

Data pre-processing is a fundamental component in any data-driven application. With the increasing complexity of data processing operations and volume of data, Cylon, a distributed dataframe system, is developed to facilitate data processing both as a standalone application and as a library, especially for Python applications. While Cylon shows promising performance results, we experienced difficulties trying to integrate with frameworks incompatible with the traditional Message Passing Interface (MPI). While MPI implementations encompass scalable and efficient c ommunication routines, their process launching mechanisms work well with mainstream HPC systems but are incompatible with some environments that adopt their own resource management systems. In this work, we alleviated this issue by directly integrating the Unified Communication X (UCX) framework, which supports a variety of classic HPC and non-HPC process-bootstrapping mechanisms as our communication framework. While we experimented with our methodology on Cylon, the same technique can be used to bring MPI communication to other applications that do not employ MPI’s built-in process management approach.

## Citation

```bibtex
@INPROCEEDINGS{10020958,
  author={Shan, Kaiying and Perera, Niranda and Lenadora, Damitha and Zhong, Tianle and Kumar Sarker, Arup and Kamburugamuve, Supun and Amila Kanewela, Thejaka and Widanage, Chathura and Fox, Geoffrey},
  booktitle={2022 IEEE International Conference on Big Data (Big Data)}, 
  title={Hybrid Cloud and HPC Approach to High-Performance Dataframes}, 
  year={2022},
  volume={},
  number={},
  pages={2728-2736},
  keywords={Message passing;Distributed databases;Big Data;Data processing;Libraries;Complexity theory;Resource management;Distributed Dataframe;High-Performance Computing;Cloud Computing;UCX},
  doi={10.1109/BigData55660.2022.10020958}}
```
