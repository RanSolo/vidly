FROM node:12
WORKDIR /app
ADD . /app
RUN npm install
RUN  apt-get update \
	&& apt-get install -y wget \
	&& rm -rf /var/lib/apt/lists/*
RUN wget https://raw.githubusercontent.com/RanSolo/bash_profile/main/utility/.profile
RUN mv .profile ~/.profile.1
RUN echo 'source ~/.profile.1' >> ~/.profile
EXPOSE 3900
CMD npm start
