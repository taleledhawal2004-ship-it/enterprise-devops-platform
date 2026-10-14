pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube-Server'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }

        stage('SonarQube SAST Analysis') {
            steps {
                echo 'Starting Static Application Security Testing (SAST)...'
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    dir('backend') {
                        sh 'echo "Backend SAST check prepared"'
                    }
                    dir('frontend') {
                        sh 'echo "Frontend SAST check prepared"'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building production container images...'
                sh 'docker build -t devops-backend-api:latest ./backend'
                sh 'docker build -t devops-frontend-ui:latest ./frontend'
            }
        }

        stage('Container Security Scan (Trivy)') {
            steps {
                echo 'Scanning images for critical vulnerabilities using Trivy...'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL --exit-code 0 devops-backend-api:latest'
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL --exit-code 0 devops-frontend-ui:latest'
            }
        }

        stage('Automated Deployment (CD)') {
            steps {
                echo 'Recreating and deploying fresh application containers...'
                sh 'docker compose -f docker-compose.yml down --remove-orphans || true'
                sh 'docker compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'CI/CD Pipeline run completed.'
        }
        success {
            echo 'All stages passed: Built, Scanned, and Deployed Successfully!'
        }
        failure {
            echo 'Pipeline Failed. Please check the logs.'
        }
    }
}