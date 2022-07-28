FROM python:3.9

WORKDIR /app

COPY ./ ./

EXPOSE 8080

RUN pip install -r requirements.txt
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx