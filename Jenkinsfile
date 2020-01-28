node {
    stage('deploy') {
        git('https://github.com/mkemesh/mkemesh.org.git')

        dir("${env.WORKSPACE}") {
            withAWS(credentials: 'mkemesh_s3', region: 'us-east-2') {
                s3Upload(bucket: 'mkemesh.org', path: '', includePathPattern: '**/*')   
            }
        }
    }
};
