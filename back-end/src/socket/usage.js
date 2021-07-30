import os from 'os'
import osu from 'node-os-utils'

export async function getUsage(){
    const {total, free, using, percent} = getRam()
    return {
        cpu: await getCpuPercent(),
        ram: {
            total,
            free,
            using,
            percent
        }
    }
}

async function getCpuPercent(){
    const {cpu} = osu
    const percent = await cpu.usage()
    return percent
}

function getRam(){
    let total = os.totalmem()
    let free = os.freemem()
    let using = total - free

    total = (((total / 1024) / 1024 ) / 1024).toFixed(1)
    using = (((using / 1024) / 1024) / 1024).toFixed(1)
    free = (((free / 1024 ) / 1024) / 1024).toFixed(1)

    let percent = (using / total) * 100
    percent = percent.toFixed(1)

    return {
        total,
        free,
        using,
        percent
    }
}