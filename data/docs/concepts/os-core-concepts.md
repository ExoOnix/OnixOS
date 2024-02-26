# OnixOS core and concepts.

## Introduction
#### What is OnixOS?
OnixOS is an independent, source-based operating system that draws inspiration from LFS and CRUX, tailored specifically for streamlined desktop usage. Engineered for efficiency, OnixOS offers a seamlessly polished and user-friendly desktop experience, making it an ideal choice for individuals seeking a refined and effortless computing environment.

#### The system architecture

OnixOS is seperated between the CORE and OPT. The core is the main core operating system packages that are necessary for its operation. The OPT standing for optional containing other optional packages. It can contain your desktop enviroment, applications and other utilities. Such system makes it easy to remove all non-core packages and currupt packages. It additionaly makes files not scatter around the system. 

OPT packages are stored in /opt/opmpkg
CORE packages are stored in the root filesystem.

When a root major update releases, the whole root gets swapped with a new one, while OPT packages update seperately.