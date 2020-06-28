@Library('jenkins-pipeline-library') _

pipeline {
	agent {
		label 'master'
	}

    parameters {
        choice       name: 'SERVEUR' , description: 'Environment to deploy', choices: 'devnode\n'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        timeout(time: 2, unit: 'HOURS')
    }
    
    triggers {
        cron('H 19 * * 1-5')
    }
    
    stages {
    	stage('Environment Setup'){
			steps{
				script{
					echo "Loading Environment variables from file pipeline-conf.yml ..."
					pipelineConf = readYaml file: "pipeline-conf.yml"
					for(envVar in pipelineConf.envVars) {
						env.setProperty(envVar.key, envVar.value)
					}

					sh 'env'
				}
			}
		}
		
		stage('Build & Check Quality'){
			steps{
				script{
					echo "Building..."
					nodejs('nodejs') {
						sh 'npm cache clean --force'
						sh 'rm -rf node_modules'
                    	sh 'npm install'
						sh 'npm run build'
                	}	
				}
			}
		}

		stage('Package Build') {
			steps{
				script{
					sh "tar -zcvf bundle.tar.gz dist/meetMe/"
				}
			}
    	}

		stage('Artifacts Creation') {
			steps{
				script{
					fingerprint 'bundle.tar.gz'
					archiveArtifacts 'bundle.tar.gz'
					echo "Artifacts created"
				}
			}
		}

		stage('Stash changes') {
			steps{
				script{
					stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
				}
			}
		}

		stage('deploy app') {
			agent {
				label "${params.SERVEUR}"
			}
			options {
				skipDefaultCheckout()
			}
			steps{
				script{
					echo 'Unstash'
					unstash 'buildArtifacts'
					echo 'Artifacts copied'

					echo 'Copy'
					sh "yes | sudo cp -R bundle.tar.gz /var/www/html && cd /var/www/html && sudo tar -xvf bundle.tar.gz"
					echo 'Copy completed'

					def attachments = [
						  [
						    text: "${env.PROJECT_NAME} deployememt succeed.",
						    fallback: "The pipeline ${env.PROJECT_NAME} SUCCESS.",
						    color: '#09d917'
						  ]
						]
						
						slackSend(channel: '#jenkins', attachments: attachments)
				}
			}
			
		}
		
    }
    
	post {
	    failure {
	    	script{
		    	def attachments = [
				  [
				    text: "Failed Pipeline: ${env.PROJECT_NAME}",
				    fallback: "The pipeline ${env.PROJECT_NAME} failed.",
				    color: '#ff0000'
				  ]
				]
				
				slackSend(channel: '#jenkins', attachments: attachments)
	    	}

	    }
	}

}