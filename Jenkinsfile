pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
               
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
               
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
          
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Sending notification...'
            
        }
    }
}
