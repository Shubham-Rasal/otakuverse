![Otakuverse Logo](assets/logo.svg)

# Otakuverse: AI-Powered Manga Translation Platform 🎯

[![Powered by Spheron](spheron-dark.svg)](https://spheron.network)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![image](https://github.com/user-attachments/assets/86e8cde3-9e89-457e-8d09-ef24aabb9991)


Otakuverse is an app that uses AI to detect and translate text in manga panels automatically. It's being build on top of Spheron's decentralized GPU network (both for model training and inference), which makes it fast, reliable, and accurate. Plus, it keeps the original art style intact! 🎉

## 🌟 Features

- **AI-Powered Text Detection**: Automatically detects text bubbles in manga panels using YOLOv8, translates them to English, and in-paints them on the image.
- **Multiple Translation Options**: Supports various translation methods including Google, HuggingFace, Baidu, and Bing
- **Font Customization**: Multiple manga-style fonts for natural-looking translations
- **Responsive UI**: Beautiful, modern interface built with Next.js and Tailwind CSS


### Directory Descriptions

- **`assets/`**: Contains project-related static assets
- **`inference-server/`**: Python-based backend for image processing and inference
  - Includes bubble detection, text addition, and translation modules
- **`training-pipeline/`**: Machine learning model training resources
- **`web-app/`**: Next.js frontend application
  - Configured with Tailwind CSS and TypeScript


## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python 3.10+
- Docker (optional)

### Installation (Local Setup)

1. Clone the repository
```bash
git clone https://github.com/yourusername/otakuverse.git
cd otakuverse
```

2. Install frontend dependencies
```bash
cd web-app
pnpm install
```

3. Install backend dependencies
```bash
cd ../inference-server
pip install -r requirements.txt
```

NOTE: You might want to do this in a virtual environment

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

1. Start the frontend
```bash
cd web-app
pnpm dev
```

2. Start the inference server
```bash
cd inference-server
python app.py
```

The web app will be available at `http://localhost:3000` and the inference server at `http://localhost:5000` or the value in the `INFERENCE_SERVER_URL` environment variable.

## 🏗️ Architecture

![image](https://github.com/user-attachments/assets/f6a5d6b4-fecf-47a9-8d6e-db6d7184a1f6)


Otakuverse is built with a modern tech stack:

- **Frontend**: Next.js, TailwindCSS, Framer Motion
- **Backend**: Flask, OpenCV, PyTorch
- **AI Models**: YOLOv8 for text detection, Various translation APIs
- **Infrastructure**: Spheron Network for decentralized training and inference


### Model

The model used to identify speech bubbles is YOLOv8. Using it directly doesn't give you good results as they are trained on a general dataset. So, we have trained our own dataset and fine-tuned the model for manga text detection.

This is done by fine-tuning the model on our own dataset. The dataset is a collection of manga images with speech bubbles annotated with the text inside them. The model is then trained on this dataset to identify the text inside the speech bubbles.

Here is the data:

- **Dataset**: [Manga Speech Bubbles Dataset](https://universe.roboflow.com/luciano-bastos-nunes/mangas-bubble/dataset/16)


### Web App

The web app is built using Next.js and TailwindCSS. It is a simple website the handles the mange file/image upload and sends it to the inference server for processing. 

### Inference Server

This the core component of the application. It is a Flask server that receives the image from the web app and processes it using OpenCV, PyTorch and various translation APIs.

The pipeline is setup as follows:

1. Receive image from web app
2. Detect text bubbles using YOLOv8
3. Translate text using various translation APIs
4. In-paint translated text on the image
5. Send processed image back to web app

### Deployment of the Inference Server on the Spheron Network

For the local deployment, you can refer the instructions given in the previous setions.

The following steps will guide you through the process of deploying the inference server on the Spheron Network:

#### 1. Install Spheron Protocol CLI (Linux, MacOS)

```bash
curl -sL1 https://sphnctl.sh | bash
```

After installation, verify the installation by using a simple command to check the Spheron version:

```bash
sphnctl version
```

#### 2. Create a Wallet 

This wallet will be used to pay for the usage of compute on the Spheron Network.

```bash
sphnctl wallet create --name <your-wallet-name>
```

Replace <your-wallet-name> with your desired wallet name. Here is an example of how the result will look:

```bash
 path: /path/to/spheron/primary.json 
 address: 0x3837215Cc8701C99C1A496B6fB9a715BFAd65262 
 secret: xxxxxxxx
 mnemonic: water vicious naive nurse sample armed exit crazy game eagle blood woman 
```

_Make sure to securely save the mnemonic phrase and key secret provided._

#### 3. Get test tokens from the Faucet

You will need some token to deploy on Spheron. Visit the Spheron Faucet to obtain test tokens for deployment. After receiving the tokens, you can check your wallet balance with:

```bash
sphnctl wallet balance --token USDT
```

Here is an example of how the result will look:

```bash
Current ETH balance: 0.02993669528 
Total USDT balance: 35 

Deposited USDT balance
 unlocked: 14.3307 
 locked: 1e-06 
```

Note: You might have locked tokens. You can unlock them with:

Deposit USDT to your escrow wallet for deployment:

```bash
sphnctl payment deposit --amount 15 --token USDT
```


#### 4. Create a Deployment 

The deployment is a concept in the Spheron Network where you can request compute resources from the Network and use them for the inference server. A deployment can be created using the dashboard or the Protocol CLI and the Infrastructure Composition Language (ICL).

The deployement configuration can be found [here](inference-server/deploy.yml).

The deployment file refers to a public image - `ghcr.io/shubham-rasal/inference-server:latest` which is already been setup with a fine-tuned YOLOv8 model trained before.

To create the deployment, we will need to follow the following steps:

- Go to inference-server directory

```bash
cd inference-server
```

- Run the following command to create the deployment

```bash
sphnctl deployment create deploy.yml
```

Here is an example of how the result will look:

```bash
Validating SDL configuration.
SDL validated.
Sending configuration for provider matching.
Deployment order created: 0x1ae69a3f63cf241495c3b91db620b72625bffd8b08afd0691309ca63a4773368
Waiting for providers to bid on the deployment order...
Bid found. 
Order matched successfully. 
Deployment created using wallet 0x3837215Cc8701C99C1A496B6fB9a715BFAd65262 
 lid: 2866 
 provider: 0x5Ed271e74ff9b6aB90A7D18B7f4103D6ad361D2b 
 agreed price per hour: 0.3027243318506784 
Sending manifest to provider...
Deployment manifest sent, waiting for acknowledgment.
Deployment is finished.
```

Note: Sometimes the deployment might fail as the exact configuration might not match the provider's requirements. In that case, you can try again with a different configuration. Just make sure to include atleast one GPU and CPU unit.


- Fetch Deployment Details

To fetch your deployment / lease details, you need to run this command to fetch it:

```bash
 sphnctl deployment get --lid [your-lid]
```

Here is an example of how the result will look:

```bash
Status of the deployment ID: 2866 
Deployment on-chain details:
 Status: Matched
 Provider: 0x5Ed271e74ff9b6aB90A7D18B7f4103D6ad361D2b
 Price per hour: 0.3027243318506784
 Start time: 2024-12-12T06:18:38Z
 Remaining time: 55min, 25sec

Services running:
  py-cuda
    URL: []
    Ports:
      - provider.gpu.gpufarm.xyz:32674 -> 8888 (TCP)
    Replicas: 1/1 available, 1 ready
    Host URI: provider.gpu.gpufarm.xyz
    Region: us-central
    IPs:
```

This will contain URL to access the deployment server, all the assigned ports and the URI to access it. With this you can check your deployment status.

Add the URL to the `NEXT_PUBLIC_INFERENCE_SERVER_URL` environment variable in the `.env` file of the [web-app](web-app/) directory.

For example, here is how the `.env` file should look like:

```bash
NEXT_PUBLIC_INFERENCE_SERVER_URL=http://provider.gpu.gpufarm.xyz:31707
```

Congratulations! You have successfully deployed the inference server on the Spheron Network.


### Training using the Spheron Network (Optional)

If you want to train the model on your own dataset, you can follow the steps below.

The training pipeline is relatively straight forward with as it is a YOLOv8 model. You can find the training pipeline notebook in the [training-pipeline](training-pipeline) directory.

The pipeline is based on the [YOLOv8 Quick Start](https://docs.ultralytics.com/quickstart/) by Ultralytics.

To train this model, we will need a GPU which can be obtained from [Spheron Network](https://spheron.network).

To train the model, the first few steps are common to the deployment of the inference server :

#### 1. Install Spheron Protocol CLI (Linux, MacOS) 

Refer [here](#1-install-spheron-protocol-cli-linux-macos)

#### 2. Create a Wallet 

Refer [here](#2-create-a-wallet)

#### 3. Get test tokens from the Faucet

Refer [here](#3-get-test-tokens-from-the-faucet)

#### 4. Create a Deployment for training

The one we will base our training deployment can be found [here](https://github.com/spheronFdn/awesome-spheron/tree/main/jupyter-with-pytorch). It is a simple Jupyter notebook that uses PyTorch to train a YOLOv8 model.

To create the deployment, we will need to follow the following steps:

- Go to training-pipeline directory

```bash
cd training-pipeline/model
```

- Run the following command to create the deployment

```bash
sphnctl deployment create train.yml
```


Note: Sometimes the deployment might fail as the exact configuration might not match the provider's requirements. In that case, you can try again with a different configuration. Just make sure to include atleast one GPU and CPU unit.


- Fetch Deployment Details

To fetch your deployment / lease details, you need to run this command to fetch it:

```bash
 sphnctl deployment get --lid [your-lid]
```

This will contain URL to access the deployment server, all the assigned ports and the URI to access it. With this you can check your deployment status.

- Setup the Notebook Environment

You can access your notebook environment at the url returned by the previous command. You can setup the environment by following the instructions in the [training-pipeline](training-pipeline) directory.



## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using [Spheron Network](https://spheron.network)
- YOLOv8 for object detection

## 🔗 Links

- [Spheron Network](https://spheron.network)
- [Documentation](docs/README.md)
- [Demo](https://otakuverse.demo.spheron.network)

---
*Note: This is a submission for the Spheron Network Bounty Program. The project demonstrates the capabilities of Spheron's decentralized infrastructure for training and hosting AI-powered applications.*
