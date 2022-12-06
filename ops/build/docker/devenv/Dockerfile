FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV LC_ALL=C.UTF-8

# JDKインストール
RUN apt-get update
RUN apt-get install -y \
  git \
  openjdk-17-jdk \
  && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# node.jsインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils sudo git curl vim unzip openssh-client wget gnupg2 lsb-release software-properties-common \
    build-essential cmake \
    libopenblas-dev \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev

WORKDIR /root/
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
COPY ./bash /root/
RUN ["/bin/bash", "/root/nodesource_setup.bash"]
RUN sudo apt install -y nodejs

RUN sudo apt-get update && \
    sudo apt-get upgrade -y

# sdkmanインストール
RUN apt-get update
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get -qq -y install curl wget unzip zip

RUN curl -s "https://get.sdkman.io" | bash
RUN source "$HOME/.sdkman/bin/sdkman-init.sh"
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle 7.6"
