import os from 'os'
import osu from 'node-os-utils'

export async function getUsage(){
    return {
        cpu: await getCpuPercent(),
        ram: await getRam()
    }
}

async function getCpuPercent(){
    const {cpu} = osu
    const percent = await cpu.usage()
    return percent
}

async function getRam(){
    const {mem} = osu
    let {totalMemMb:total, usedMemMb:using} = await mem.used()

    using = using / 1024
    total = total / 1024
    
    let percent = (using / total) * 100

    percent = percent.toFixed(1)
    using = using.toFixed(1)
    total = total.toFixed(1)

    return {
        total,
        using,
        percent}
}