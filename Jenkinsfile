pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
        DOCKER_HUB_USERNAME = 'jp0411'
        FRONTEND_IMAGE = 'fe'
        BACKEND_IMAGE = 'be'
        DATABASE_IMAGE = 'jp0411/database'
    }

    stages {
        stage('Build or Pull Frontend') {
            steps {
                script {
                    if (!dockerImageExists(DOCKER_HUB_USERNAME, FRONTEND_IMAGE, 'latest')) {
                        docker.build(FRONTEND_IMAGE, './frontend').push('latest')
                    } else {
                        sh "docker pull ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Build or Pull Backend') {
            steps {
                script {
                    if (!dockerImageExists(DOCKER_HUB_USERNAME, BACKEND_IMAGE, 'latest')) {
                        docker.build(BACKEND_IMAGE, './backend').push('latest')
                    } else {
                        sh "docker pull ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Build or Pull Database') {
            steps {
                script {
                    if (!dockerImageExists(DOCKER_HUB_USERNAME, DATABASE_IMAGE, 'latest')) {
                        docker.build(DATABASE_IMAGE, './database').push('latest')
                    } else {
                        sh "docker pull ${DATABASE_IMAGE}:latest"
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

    post {
        always {
            cleanWs()
        }
    }
}

def dockerImageExists(user, image, tag) {
    def response = sh (
        script: "curl -s -o /dev/null -w '%{http_code}' https://hub.docker.com/v2/repositories/${user}/${image}/tags/${tag}/",
        returnStatus: true
    )
    return response == 200
}
