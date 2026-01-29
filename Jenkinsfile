pipeline {
    agent any
    
    tools {
        nodejs 'node' 
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
                    // Use bat for Windows
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv("${env.SONAR_SERVER}") {
                        bat "${scannerHome}\\bin\\sonar-scanner.bat -Dsonar.projectKey=simple-project"
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Use bat and make sure Navyakankipati03 is correct
                bat "docker build -t Navyakankipati03/simple-project:latest ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                // Windows handles variables a bit differently in bat
                bat "docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%"
                bat "docker push Navyakankipati03/simple-project:latest"
            }
        }
    }
}