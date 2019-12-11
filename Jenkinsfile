node {
    stage('deploy') {
        git('https://github.com/mkemesh/mkemesh.org.git')

        dir("${env.WORKSPACE}") {
            files = findFiles(glob: '**')
        
            withAWS(credentials: 'mkemesh_s3', region: 'us-east-2') {
                files.each { item ->
                    echo("${item.path}")
                    s3Upload(bucket: 'mkemesh.org', path:'', file: "${item.path}")   
                }
            }
        }
    }
};
