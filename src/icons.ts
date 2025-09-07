import python from "./assets/icons/python.svg";
import rust from "./assets/icons/rust.svg";
import data from "./assets/icons/data.svg";
import ml from "./assets/icons/ml.svg";
import web from "./assets/icons/web.svg";
import tailwind from "./assets/icons/tailwindcss.svg";
import react from "./assets/icons/react.svg";
import postgres from "./assets/icons/postgresql.svg";
import typescript from "./assets/icons/typescript.svg";
import html from "./assets/icons/html.svg";
import css from "./assets/icons/css.svg";
import hpc from "./assets/icons/hpc.svg";
import etl from "./assets/icons/etl.svg";
import noaa from "./assets/icons/noaa.svg";
import pandas from "./assets/icons/pandas.svg";
import slurm from "./assets/icons/slurm.svg";
import cpp from "./assets/icons/cpp.svg";
import cuda from "./assets/icons/cuda.svg";
import raspberry from "./assets/icons/raspberrypi.svg";
import tensorflow from "./assets/icons/tensorflow.svg";
import jira from "./assets/icons/jira.svg";
import numpy from "./assets/icons/numpy.svg";
import uav from "./assets/icons/uav.svg";
import pytorch from "./assets/icons/pytorch.svg";
import roboflow from "./assets/icons/roboflow.svg";
import airflow from "./assets/icons/airflow.svg";
import classwork from "./assets/icons/class.svg";
import design from "./assets/icons/design.svg";
import opencv from "./assets/icons/opencv.svg";
import MATLAB from "./assets/icons/matlab.svg";
import api from "./assets/icons/api.svg";
import postman from "./assets/icons/postman.svg"

export const ICON_URLS: Record<string, string> = {
    python,
    rust,
    "data science": data,
    "machine learning": ml,
    "web dev": web,
    data,
    ml,
    tailwind,
    react,
    postgres,
    typescript,
    css,
    hpc,
    etl,
    noaa,
    pandas,
    slurm,
    "c++": cpp,
    "cuda c": cuda,
    "raspberry pi": raspberry,
    tensorflow,
    jira,
    numpy,
    uav,
    pytorch,
    "ncsa": hpc,
    html,
    roboflow,
    "apache airflow": airflow,
    "class work": classwork,
    "software design": design,
    "opencv": opencv,
    "matlab": MATLAB,
    "rest api": api,
    postman

}

export const DEFAULT_ICON_URL = python;

