pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('doxie')
        DOCKER_HUB_USERNAME = 'jp0411'
        FRONTEND_IMAGE = 'frontend'
        BACKEND_IMAGE = 'backend'
        DATABASE_IMAGE = 'database'
    }

    stages {
        stage('Pull Frontend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        sh "docker pull ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Pull Backend Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        sh "docker pull ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Pull Database Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                        sh "docker pull ${DOCKER_HUB_USERNAME}/${DATABASE_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
