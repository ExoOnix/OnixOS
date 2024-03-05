# OnixOS Package Manager.

## Introduction
#### What is Onix Package Manager?

The Onix Package Manager is a lighweight and basic, however powerfull package manager written in bash. The Onix Package Manager can install binaries or compile from sources and run custom scripts defined in the config.sh file. 

#### How to use it?

To install a package run:

```bash
opm install python
```

To uninstall a package run:
```bash
opm uninstall python
```

To install a package from a local .opm file run:
```bash
opm install python.opm
```

If you enter a file extention, OPM will attempt a local install.


#### How to make a package?

##### Intro

To create a package, first create a folder named as your package. A filestructure will later be created resembling the filesystem.

##### File structure

- YourPackage
    - config.sh
    - pkgfiles
    - usr
        - bin
            - YourPackage
    - share
        - doc
            - YourPackage
                - docs.html
    
##### pkgfiles

pkgfiles can be generated with: ``find -type f > pkgfiles`` inside the package folder.
Then remove ./config.sh and ./pkgfiles from the file. And add the necessary folders for your package such as /usr/share/doc/YourPackage, remove dots at start of every line. This file is necessary for deletion of the package.

The result of pkgfiles should be:
```
/usr/bin/YourPackage
/usr/share/doc/YourPackage/docs.html
/usr/share/doc/YourPackage
```

##### config.sh

Create the following file:
```bash
NAME="YourPackage"
ALIAS="yourpackage"
VERSION="1.0"
DESC="YourPackage does this..."
LICENSE="GPL3.0"
URL="https://yourpackage.org"

PRE_INSTALL() {
    ldconfig

    #Check for binary
    echo "Checking if bzip2 is installed"
    if ! command -v bzip2 &> /dev/null; then
        echo "Error: bzip2 is not installed. Please install bzip2."
        if ! opm install bzip2; then
            echo "Error: Failed to install bzip2."
            exit 1
        fi
    fi

    # Check for library
    echo "Checking if zlib is installed"
    if ldconfig -p | grep -q libz.so; then
        :
    else
        echo "Error: Zlib is not installed. Please install Zlib."
        if ! opm install zlib; then
            echo "Error: Failed to install zlib."
            exit 1
        fi
    fi

    # Check with opm
    if opm list | grep "xz"; then
        :
    else
        echo "Error: xz is not installed. Please install xz."
        if ! opm install xz; then
            echo "Error: Failed to install xz."
            exit 1
        fi
    fi

    echo "Dependancy check complete."

}

POST_INSTALL() {
    :
}

PRE_UNINSTALL() {
    :
}

POST_UNINSTALL() {
    :
}
```

Such file defines package metadata and how it should be installed and uninstalled. Fill in values accordingly and use the listed dependancy methods as needed.

##### Packaging
Enter the root folder and enter ``tar -czvf YourPackage.opm YourPackage``.

##### Installing your package
You can now execute ``opm install YourPackage.opm``.

This article is a stub. Help improve it at [Github](https://github.com/ExoOnix/OnixOS/blob/main/data/docs/concepts/opm.md).