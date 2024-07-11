pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FE = 'ashoksanareddy/doxie_fe'
        DOCKER_IMAGE_BE = 'ashoksanareddy/doxie_be'
        REGISTRY_FE = 'https://hub.docker.com/repository/docker/ashoksanareddy/doxie_fe/general'
        REGISTRY_BE = 'https://hub.docker.com/repository/docker/ashoksanareddy/doxie_be/general'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-cred']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                        cd ~/
                        rm -rf Doxie_Frontend/
                        git clone https://github.com/Ashoksana/Doxie_Frontend.git
                        cd Doxie_Frontend
                        git checkout main'
                        """
                    }
                }
            }
        }

        stage('Check Docker Image') {
            steps {
                script {
                    def imageExists = false

                    def result = sh(script: """
                        ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                        docker images -q ${REGISTRY_FE}/${DOCKER_IMAGE_FE}'
                    """, returnStdout: true).trim()

                    if (result) {
                        imageExists = true
                        echo "Docker image ${DOCKER_IMAGE_FE} found on target server."
                    } else {
                        echo "Docker image not found on target server, checking Docker Hub..."
                        try {
                            docker.withRegistry("${REGISTRY_FE}", 'docker-ashok-crenden') {
                                docker.image("${DOCKER_IMAGE_FE}").pull()
                                imageExists = true
                                echo "Docker image ${DOCKER_IMAGE_FE} found on Docker Hub."
                            }
                        } catch (Exception e) {
                            echo "Docker image not found on Docker Hub."
                        }
                    }

                    currentBuild.description = imageExists ? "Image exists" : "Image not found, building new image"
                    env.IMAGE_EXISTS = imageExists.toString()
                }
            }
        }

        stage('Build Frontend Docker Image') {
            when {
                expression { return env.IMAGE_EXISTS == 'false' }
            }
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-cred']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                        cd ~/Doxie_Frontend
                        docker build -t ${DOCKER_IMAGE_FE}:latest .'
                        """
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            when {
                expression { return env.IMAGE_EXISTS == 'false' }
            }
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-cred']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                        cd ~/Doxie_Frontend/BE
                        docker build -t ${DOCKER_IMAGE_BE}:latest .'
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            when {
                expression { return env.IMAGE_EXISTS == 'false' }
            }
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-cred']) {
                        withCredentials([usernamePassword(credentialsId: 'docker-ashok-crenden', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                            sh """
                            ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                            docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                            docker push ${DOCKER_IMAGE_FE}:latest
                            docker push ${DOCKER_IMAGE_BE}:latest
                            '
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sshagent(credentials: ['jenkins-ssh-cred']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${ec2user}@${ec2ip} '
                        cd Doxie_Frontend/
                        docker compose up -d'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
