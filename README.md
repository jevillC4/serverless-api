## Setup Instructions

To set up and run this project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jevillC4/serverless-api.git
   cd serverless-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure AWS Credentials**:
   You need to configure your AWS credentials to deploy and run the project.

   - **Option 1: Using AWS CLI**:
     Run the following command and follow the prompts to set up your AWS credentials:
     ```bash
     aws configure
     ```

   - **Option 2: Using Environment Variables**:
     Set your AWS credentials as environment variables:
     ```bash
     export AWS_ACCESS_KEY_ID=your_access_key_id
     export AWS_SECRET_ACCESS_KEY=your_secret_access_key
     export AWS_REGION=your_region
     ```

4. **Deploy the Project**:
   To deploy the project to AWS, run:
   ```bash
   serverless deploy
   ```

5. **Run the Project Locally**:
   To run the project locally using `serverless-offline`, run:
   ```bash
   serverless offline
   ```

