pipeline {
    agent any
    
    // This connects the Jenkins tools you configured earlier
    tools {
        nodejs 'node' // Use the name you gave in Global Tool Configuration
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
        SONAR_SERVER = 'sonar-server'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner' // Use the name from Global Tool Configuration
                    withSonarQubeEnv("${env.SONAR_SERVER}") {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=simple-project"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Building the image locally on the Jenkins agent
                sh "docker build -t navyakankipati3093/simple-project:latest ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                sh "docker push navyakankipati3093/simple-project:latest"
            }
        }
    }
}