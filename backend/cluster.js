const cluster = require('cluster')

if (cluster.isMaster) {
    const workers = require('os').cpus().length

    for (let i = 0; i < workers; i++) {
        cluster.fork()
    }

    cluster.on('online', (worker) => {
        console.log(`Worker started with a pid of : ${worker.process.pid}`)
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker died with a pid of : ${worker.process.pid}`)
        cluster.fork()
    })
}
else{
    require('./index')
}