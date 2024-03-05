# OnixOS Package Manager

## Introduction
#### What is OnixOS?
OnixOS is an independent, source-based operating system that draws inspiration from LFS and CRUX, tailored specifically for streamlined desktop usage. Engineered for efficiency, OnixOS offers a seamlessly polished and user-friendly desktop experience, making it an ideal choice for individuals seeking a refined and effortless computing environment.

#### The system architecture

OnixOS is seperated between the CORE and OPT. The core is the main core operating system packages that are necessary for its operation. The OPT standing for optional containing other optional packages. It can contain your desktop enviroment, applications and other utilities. Such system makes it easy to remove all non-core packages and currupt packages. It additionaly makes files not scatter around the system. 

OPT packages are stored in /opt/opmpkg
CORE packages are stored in the root filesystem.

When a root major update releases, the whole root gets swapped with a new one, while OPT packages update seperately.

## Onix Package Manager

The Onix Package Manager is a lighweight and basic, however powerfull package manager written in bash. The Onix Package Manager can install binaries or compile from sources and run custom scripts defined in the config.sh file. 

To install a package run

```bash
opm install python
```

To uninstall a package run
```bash
opm uninstall python
```

To install a package from a local .opm file run
```bash
opm install python.opm
```

If you enter a file extention, OPM will attempt a local install.

Read more in this Concepts/Onix-Package-Manager



This article is a stub. Help improve it at [Github](https://github.com/ExoOnix/OnixOS/blob/main/data/docs/concepts/os-core-concepts.md).